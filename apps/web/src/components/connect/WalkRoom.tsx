import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { StreamChat } from "stream-chat";
import {
  Chat,
  Channel,
  MessageList,
  MessageInput,
} from "stream-chat-react";
import "stream-chat-react/dist/css/v2/index.css";
import { fetchWalkRooms, getChatToken, leaveWalkRoom } from "../../functions/api";
import { trackAction } from "../../utils/umami";

const WalkRoom: React.FC = () => {
  const { roomId } = useParams<{ roomId: string }>();
  const navigate = useNavigate();
  const clientRef = useRef<StreamChat | null>(null);

  const [client, setClient] = useState<StreamChat | null>(null);
  const [channel, setChannel] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showLeaveConfirm, setShowLeaveConfirm] = useState(false);
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    const init = async () => {
      const userId = localStorage.getItem("breatheUserId");

      if (!roomId) {
        setError("This walk could not be opened.");
        setLoading(false);
        return;
      }

      if (!userId) {
        setError("You need to be signed in to open this walk.");
        setLoading(false);
        return;
      }

      const apiKey = process.env.REACT_APP_STREAM_API_KEY;
      if (!apiKey) {
        console.error("Missing REACT_APP_STREAM_API_KEY");
        setError("This walk could not be opened.");
        setLoading(false);
        return;
      }

      let streamClient: StreamChat | null = null;

      try {
        // 1. Find the room and streamChannelId
        const rooms = await fetchWalkRooms();
        const room = Array.isArray(rooms)
          ? rooms.find((r: any) => r.id === roomId)
          : (rooms || []).find((r: any) => r.id === roomId);

        if (!room || !room.streamChannelId) {
          setError("This walk could not be opened.");
          setLoading(false);
          return;
        }

        const streamChannelId = room.streamChannelId as string;

        // 2. Fetch token from backend (uses API base URL from api.ts)
        const token = await getChatToken(userId);

        // 3. Initialize Stream client
        streamClient = StreamChat.getInstance(apiKey);
        await streamClient.connectUser({ id: userId }, token);

        // 4. Join the channel
        const walkChannel = streamClient.channel(
          "messaging",
          streamChannelId
        );
        await walkChannel.watch();

        clientRef.current = streamClient;
        setClient(streamClient);
        setChannel(walkChannel);
        setLoading(false);
      } catch (err) {
        console.error("Error initializing walk room:", err);
        setError("This walk could not be opened.");
        setLoading(false);
        if (streamClient) {
          await streamClient.disconnectUser();
        }
      }
    };

    init();

    return () => {
      const c = clientRef.current;
      if (c) {
        c.disconnectUser();
        clientRef.current = null;
      }
    };
  }, [roomId]);

  const handleLeaveClick = () => {
    trackAction("Walk Together - Leave Walk Click");
    setShowLeaveConfirm(true);
  };

  const handleLeaveConfirm = async () => {
    if (!roomId) return;
    setLeaving(true);
    trackAction("Walk Together - Leave Walk Confirm");
    try {
      await leaveWalkRoom(roomId);
      trackAction("Walk Together - Leave Walk Success");
      // Navigate immediately; cleanup will disconnect client on unmount.
      // Avoids setState/disconnect here which can cause concurrent render errors.
      navigate("/connect?section=walk-together", { replace: true });
    } catch (err) {
      console.error("Failed to leave walk", err);
      trackAction("Walk Together - Leave Walk Error");
      setLeaving(false);
    }
  };

  const handleStay = () => {
    trackAction("Walk Together - Leave Walk Stay");
    setShowLeaveConfirm(false);
  };

  const renderContent = () => {
    if (loading) {
      return (
        <p className="italic text-gray-500 text-center mt-4">
          Opening your walk...
        </p>
      );
    }

    if (error || !client || !channel) {
      return (
        <p className="italic text-gray-500 text-center mt-4">
          {error || "This walk could not be opened."}
        </p>
      );
    }

    return (
      <Chat client={client} theme="messaging light">
        <Channel channel={channel}>
          <div className="flex flex-col h-full w-full min-w-0">
            <div className="flex-1 overflow-y-auto w-full min-w-0 [&_.str-chat__main-panel]:!max-w-none [&_.str-chat__list]:!max-w-none">
              <MessageList />
            </div>
            <div className="mt-3 mb-1 flex justify-between items-center">
              <button
                onClick={handleLeaveClick}
                disabled={leaving}
                className="bg-[#ece8e1] hover:bg-[#e4dfd8] text-sm px-4 py-1 rounded-full shadow-sm text-[#5e5a55] transition disabled:opacity-70"
              >
                {leaving ? "Leaving..." : "Leave Walk"}
              </button>
            </div>
            {showLeaveConfirm && (
              <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
                <div className="bg-[#fff9f3] rounded-2xl p-6 max-w-md w-full mx-4 shadow-lg border border-[#e4dfd8]">
                  <p className="text-sm text-[#5e5a55] text-center mb-4">
                    This walk will gently come to an end. Are you ready to leave?
                  </p>
                  <div className="flex justify-center gap-3">
                    <button
                      onClick={handleStay}
                      disabled={leaving}
                      className="px-4 py-2 text-sm rounded-full bg-[#ece8e1] hover:bg-[#e4dfd8] text-[#5e5a55] transition"
                    >
                      Stay
                    </button>
                    <button
                      onClick={handleLeaveConfirm}
                      disabled={leaving}
                      className="px-4 py-2 text-sm rounded-full bg-[#ece8e1] hover:bg-[#e4dfd8] text-[#5e5a55] transition disabled:opacity-70"
                    >
                      {leaving ? "Leaving..." : "Leave Walk"}
                    </button>
                  </div>
                </div>
              </div>
            )}
            <div className="mt-1">
              <MessageInput focus />
            </div>
          </div>
        </Channel>
      </Chat>
    );
  };

  return (
    <div className="w-screen min-h-screen flex justify-center items-center bg-[#f4f1eb] text-[#5e5a55] font-serif">
      <div className="w-full max-w-[500px] bg-[#fff9f3] rounded-2xl shadow-md border border-[#e4dfd8] p-5 flex flex-col h-[90vh]">
        <div className="mb-4 text-center">
          <p className="text-sm text-[#6e6861] mb-2">
            You are walking with the author of a reflection that resonated
            with you.
          </p>
          <p className="text-xs italic text-[#9a958f]">
            Speak gently.
            <br />
            Leave when ready.
          </p>
        </div>
        <div className="flex-1 overflow-hidden w-full min-w-0">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default WalkRoom;