import { NavigateFunction } from "react-router-dom";

/**
 * Really need to be worked on.
 */

export const getChapters = (navigate: NavigateFunction) => [
  {
    id: "pause",
    number: "Chapter 1",
    title: "The Pause",
    content: `You found your way here — not to scroll, but to slow down.
To pause and listen.
Maybe for the first time in a while, you let the quiet find you.
And in that stillness, you felt… a tiny ache, or maybe just a breath.
Let’s start here, in this soft hush.
Let’s see what you might hear — if you listen gently.`,
    cta: "Begin Reflecting",
    undernote: "Takes you to your first reflection.",
    onClick: () => navigate("/reflect"),
  },
  {
    id: "quiet-ache",
    number: "Chapter 2",
    title: "The Quiet Ache",
    content: `There’s a space inside you that holds more than you say.
Words unsent, feelings unshared.
This is where reflections begin — not to fix, but to witness.
To let your heart speak without interruption.
What would you say, if no one was judging?
Let it spill softly here.`,
    cta: "Write a Reflection",
    undernote: "Brings you to the reflect chat.",
    onClick: () => navigate("/reflect"),
  },
  {
    id: "gentle-echo",
    number: "Chapter 3",
    title: "A Gentle Echo",
    content: `Sometimes, a quiet note from someone else can shift the air inside you.
A moment that says: I feel it too.
Here, your reflections gather with others — not to shout, but to breathe together.
You’ll find small echoes of your own journey in the words of others.
You can reach out, if you feel moved.
A simple warmth. A gentle “me too.”`,
    cta: "Enter Peer Room",
    undernote: "Peer reflections with warmth, relate, or walk options.",
    onClick: () => navigate("/connect?section=peer-reflections"),
  },
  {
    id: "walk-together",
    number: "Chapter 4",
    title: "Walk Together",
    content: `Some connections ask for more than a glance.
They ask for presence.
A walk, side by side — not to chase or fix, but to simply be.
Here, you can walk together for a while.
No past, no future — just this gentle now.
When you’re ready, send the invitation.
Let’s walk together.`,
    cta: "Send a Walk Request",
    undernote: "Connect to a fellow breather for a slow walk conversation.",
    onClick: () => navigate("/connect?section=walk-together"),
  },
  {
    id: "letting-go",
    number: "Chapter 5",
    title: "Letting Go",
    content: `Every breath finds its end.
Every step reaches a pause.

Everything here fades, as all things do.
That’s not a flaw—it’s the nature of breath.

Moments fade. Conversations quiet.
Reflections dissolve — not because they weren’t real,
but because that’s how life moves.

Because part of living is knowing:
what was real doesn't need to be forever.

And what you carry now—you carry lighter.
To carry the warmth without holding on too tight.
Let what’s real rest gently inside you.

As breathers, we let go. We learn. We keep moving—gently.`,
    cta: "Let Go",
    undernote: "Ending or archiving reflections, ephemeral moments.",
    onClick: () => navigate("/connect?section=your-reflections"),
  },
  {
    id: "depth-mode",
    number: "Chapter 6",
    title: "The Deep End",
    content: `Under mindful construction...
    👷‍♀️🛠️👷
    `,
    // cta: "Explore Depth Mode",
    cta: "Till then, try out save a note.",
    undernote:
      "Write a note just for you—a thought, a feeling—held softly, without needing to be shared.",
    onClick: () => navigate("/saveanote"),
  },
];
