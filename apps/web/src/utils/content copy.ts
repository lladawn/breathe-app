import { NavigateFunction } from "react-router-dom";

// First chapters — can connect to real features later

export const getChapters = (navigate: NavigateFunction) => [
  {
    id: "reflect",
    number: "Chapter 1",
    title: "The Ache",
    content: `You made it here.
Maybe not to fix anything… but to finally sit with it.

The ache that no one saw.
The pause between smiles.
The words you never typed.
It stayed — quiet — like a stone in your chest.

But ache doesn’t mean broken.
It just means you felt something deeply… and didn’t rush past it.

And maybe now… you don’t have to.

What does your ache want to say, if it could speak without being judged?`,
    cta: "Begin Reflection",
    onClick: () => navigate("/reflect"),
  },
  {
    id: "moment",
    number: "Chapter 2",
    title: "A Fleeting Spark",
    content: `A moment passed between two lives.

No replies. No expectations.
Just a gentle echo: someone felt what you wrote.

A flicker of warmth,
a whisper of “me too.”

Not everything has to become something.
Sometimes, it just needs to be felt.

This is where we begin—
sending a signal, soft as breath.`,
    cta: "Send a Moment",
    onClick: () => navigate("/connect"),
    /**
     * a space to send moments to fellow breathers
     * or if they have received moments take to that page
     * we can take this chapter further in the story ig, after the user has learnt to save a reflection
     */
  },
  {
    id: "peer-room",
    number: "Chapter 3",
    title: "The Quiet Between Us",
    content: `You are not alone.

In the Peer Room, reflections gather like dew—
not loud, not many,
just a few honest breaths from others walking through life.

You pause. You read.
You may feel something stir.

And if you do, you can choose:
Send warmth. Relate. Or just be.

No feeds. No noise. Just presence.`,
    cta: "Enter Peer Room",
    onClick: () => navigate("/connect"),
    /**
     * to connect with fellow breathers
     * a quite few
     * */
  },
  {
    id: "walk-together",
    number: "Chapter 4",
    title: "Walk Together",
    content: `Some connections ask for more than a moment.
They ask for time.

Not forever—just a little while.
A walk, not a chase.

When you send a request to walk together,
a doorway opens—a space where two breathers meet.

No past. No future.
Just a gentle now.

Will you walk with me?`,
    cta: "Send a Walk Request",
    onClick: () => navigate("/connect?category=walks"),
    /**
     * a space to take to accepted walks
     * if not take to peer room to send walk requests
     */
  },
  {
    id: "letting-go",
    number: "Chapter 5",
    title: "Letting Go",
    content: `Nothing here lasts forever.

That’s not a flaw—it’s a feature.

Moments fade. Conversations dissolve.
Even what touched you deeply… lets go in time.

Because part of healing is knowing
what was real doesn't have to be forever.

And what you carry now—you carry lighter.`,
    cta: "Breathe Out",
    onClick: () => navigate("/letting-go"),
    /**
     * chat space fading away long gone walks
     * and asking you to note a memory -- like save a note maybe
     * or a thought or something you liked or learnt
     */
  },
  {
    id: "depth-mode",
    number: "Chapter 6",
    title: "The Deep End",
    content: `Some will want to go deeper.
To sit longer. To not just breathe—but dwell.

Depth Mode opens a space for that:
Longer walks. Slower pages.
More time to feel.

This is not a product.
It’s a quiet offering—for those who feel called.

Come when you’re ready.
Stay only if it feels right.`,
    cta: "Enter Depth Mode",
    onClick: () => navigate("/depth"),
    /**
     * The content is super wrong.
     * This will be the paid aspect of Breathe.
     * Maybe support or receive a share in the future of Breathe.
     * we will make this later.
     */
  },
];
