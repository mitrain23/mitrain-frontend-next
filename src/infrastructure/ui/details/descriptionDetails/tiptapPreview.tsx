import { EditorContent, useEditor } from "@tiptap/react";
import BulletList from "@tiptap/extension-bullet-list";
import ListItem from "@tiptap/extension-list-item";
import OrderedList from "@tiptap/extension-ordered-list";
import Link from "@tiptap/extension-link";
import StarterKit from "@tiptap/starter-kit";
import React from "react";
import sanitize from "sanitize-html";

type Props = {
  text?: string;
};

const TipTapPreview = ({ text }: Props) => {
  const editor = useEditor({
    editable: false,
    extensions: [
      StarterKit,
      BulletList,
      ListItem,
      OrderedList,
      Link.configure({
        validate: (href) => /^https?:\/\//.test(href),
        openOnClick: true,
        HTMLAttributes: {
          class: "text-blue-600",
        },
      }),
    ],
    editorProps: {
      attributes: {
        class: "prose dark:prose-invert prose-xs m-2 focus:outline-none",
      },
    },
    content: sanitize(text!, {
      allowedTags: ["p", "a", "br", "ul", "li", "strong"],
      allowedAttributes: {
        a: ["href", "class"],
      },
    }),
  });

  return (
    <div className="">
      <EditorContent editor={editor} />
    </div>
  );
};

export default TipTapPreview;
