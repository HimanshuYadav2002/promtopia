import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";

// GET (read)
export const GET = async (req, { params }) => {
  try {
    const { id } = await params;
    console.log(id);
    await connectToDB();
    const prompt = await Prompt.findOne({ _id: id }).populate("creator");

    if (!prompt) {
      return new Response("Prompt not found", { status: 404 });
    }
    return new Response(JSON.stringify(prompt), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Failed to fetch particular prompt", { status: 500 });
  }
};

// PATCH (update)
export const PATCH = async (req, { params }) => {
  const { prompt, tags } = await req.json();

  try {
    const { id } = await params;
    await connectToDB();
    const existingPrompt = await Prompt.findOne({ _id: id });

    if (!existingPrompt) {
      return new Response("Prompt not found", { status: 404 });
    }
    existingPrompt.prompt = prompt;
    existingPrompt.tag = tags;

    console.log(existingPrompt.prompt);
    console.log(existingPrompt.tag);

    await existingPrompt.save();
    return new Response(JSON.stringify(existingPrompt), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Failed to update prompt", { status: 500 });
  }
};
// DELETE (delete)
export const DELETE = async (req, { params }) => {
  try {
    const { id } = await params;
    await connectToDB();
    const prompt = await Prompt.findOneAndDelete({ _id: id });
    console.log(prompt);
    if (!prompt) {
      return new Response("Prompt not found", { status: 404 });
    }

    return new Response("Prompt deleted successfully", { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Failed to delete prompt", { status: 500 });
  }
};
