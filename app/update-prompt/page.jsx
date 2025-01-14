"use client";
import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";

import Form from "@components/Form";

const EditPrompt = () => {
  const router = useRouter();
  const promptId = useSearchParams().get("id");
  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState({ prompt: "", tags: "" });

  useEffect(() => {
    const getPromptDetails = async () => {
      if (!promptId) return;

      try {
        const response = await fetch(`/api/prompt/${promptId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch prompt details");
        }
        const data = await response.json();
        setPost({ prompt: data.prompt, tags: data.tags });
      } catch (error) {
        console.error(error);
      }
    };

    getPromptDetails();
  }, [promptId]);

    const UpdatePrompt = async (e) => {
      e.preventDefault();
      setSubmitting(true);

      console.log(post);

      if (!promptId) return alert("Prompt ID is missing");

      try {
        const response = await fetch(`/api/prompt/${promptId}`, {
          method: "PATCH",
          body: JSON.stringify({ prompt: post.prompt, tags: post.tag }),
        });

        if (response.ok) {
          router.push("/");
        }
      } catch (error) {
        console.error(error);
      } finally {
        setSubmitting(false);
      }
    };
  return (
    <Form
      type="Edit"
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={UpdatePrompt}
    />
  );
};
export default EditPrompt;
