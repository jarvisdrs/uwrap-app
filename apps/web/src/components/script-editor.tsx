'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';
import Highlight from '@tiptap/extension-highlight';
import { useState, useEffect } from 'react';
import {
  Bold,
  Italic,
  List,
  ListOrdered,
  Heading1,
  Heading2,
  Quote,
  Code,
  Undo,
  Redo,
  MoreHorizontal,
  Save,
  Lock,
  Unlock,
  History,
  MessageSquare,
} from 'lucide-react';
import { Button, Separator } from '@uwrap/ui';

interface ScriptEditorProps {
  initialContent?: string;
  onSave?: (content: string) => void;
  isLocked?: boolean;
  lockedBy?: string | null;
}

export function ScriptEditor({
  initialContent = '',
  onSave,
  isLocked = false,
  lockedBy,
}: ScriptEditorProps) {
  const [isSaving, setIsSaving] = useState(false);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: 'Start writing your script...',
      }),
      Highlight,
    ],
    content: initialContent,
    editable: !isLocked,
  });

  useEffect(() => {
    if (editor) {
      editor.setEditable(!isLocked);
    }
  }, [editor, isLocked]);

  const handleSave = async () => {
    if (!editor || !onSave) return;
    
    setIsSaving(true);
    await onSave(editor.getHTML());
    setIsSaving(false);
  };

  if (!editor) {
    return <div className="h-96 bg-slate-100 dark:bg-slate-800 rounded-lg animate-pulse" />;
  }

  return (
    <div className="space-y-4">
      {/* Toolbar */}
      <div className="flex items-center gap-2 p-2 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 flex-wrap">
        <ToolbarGroup>
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleBold().run()}
            isActive={editor.isActive('bold')}
            disabled={isLocked}
            icon={Bold}
            title="Bold"
          />
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleItalic().run()}
            isActive={editor.isActive('italic')}
            disabled={isLocked}
            icon={Italic}
            title="Italic"
          />
        </ToolbarGroup>

        <Separator orientation="vertical" className="h-6" />

        <ToolbarGroup>
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
            isActive={editor.isActive('heading', { level: 1 })}
            disabled={isLocked}
            icon={Heading1}
            title="Heading 1"
          />
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
            isActive={editor.isActive('heading', { level: 2 })}
            disabled={isLocked}
            icon={Heading2}
            title="Heading 2"
          />
        </ToolbarGroup>

        <Separator orientation="vertical" className="h-6" />

        <ToolbarGroup>
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            isActive={editor.isActive('bulletList')}
            disabled={isLocked}
            icon={List}
            title="Bullet List"
          />
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            isActive={editor.isActive('orderedList')}
            disabled={isLocked}
            icon={ListOrdered}
            title="Numbered List"
          />
        </ToolbarGroup>

        <Separator orientation="vertical" className="h-6" />

        <ToolbarGroup>
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
            isActive={editor.isActive('blockquote')}
            disabled={isLocked}
            icon={Quote}
            title="Quote"
          />
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleCode().run()}
            isActive={editor.isActive('code')}
            disabled={isLocked}
            icon={Code}
            title="Code"
          />
        </ToolbarGroup>

        <Separator orientation="vertical" className="h-6" />

        <ToolbarGroup>
          <ToolbarButton
            onClick={() => editor.chain().focus().undo().run()}
            disabled={isLocked || !editor.can().undo()}
            icon={Undo}
            title="Undo"
          />
          <ToolbarButton
            onClick={() => editor.chain().focus().redo().run()}
            disabled={isLocked || !editor.can().redo()}
            icon={Redo}
            title="Redo"
          />
        </ToolbarGroup>

        <div className="flex-1" />

        <ToolbarGroup>
          <Button
            variant="outline"
            size="sm"
            className="gap-2"
            disabled={isLocked}
          >
            <History className="w-4 h-4" />
            History
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            className="gap-2"
            disabled={isLocked}
          >
            <MessageSquare className="w-4 h-4" />
            Comments
          </Button>
          
          <Button
            onClick={handleSave}
            isLoading={isSaving}
            size="sm"
            className="gap-2"
            disabled={isLocked}
          >
            <Save className="w-4 h-4" />
            Save
          </Button>
        </ToolbarGroup>
      </div>

      {/* Editor */}
      <div className="relative">
        {isLocked && (
          <div className="absolute inset-0 bg-slate-50/50 dark:bg-slate-900/50 backdrop-blur-sm z-10 flex items-center justify-center rounded-lg">
            <div className="bg-white dark:bg-slate-900 px-6 py-4 rounded-xl shadow-lg border border-slate-200 dark:border-slate-800 text-center">
              <Lock className="w-8 h-8 text-orange-500 mx-auto mb-3" />
              <h3 className="font-semibold text-slate-900 dark:text-white mb-1">Script Locked</h3>
              <p className="text-sm text-slate-500">
                {lockedBy ? `Locked by ${lockedBy}` : 'This script is currently locked'}
              </p>
            </div>
          </div>
        )}

        <div className="min-h-[500px] bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800">
          <EditorContent
            editor={editor}
            className="prose dark:prose-invert max-w-none p-6 focus:outline-none script-editor"
          />
        </div>
      </div>
    </div>
  );
}

function ToolbarGroup({ children }: { children: React.ReactNode }) {
  return <div className="flex items-center gap-1">{children}</div>;
}

function ToolbarButton({
  onClick,
  isActive,
  disabled,
  icon: Icon,
  title,
}: {
  onClick: () => void;
  isActive?: boolean;
  disabled?: boolean;
  icon: any;
  title: string;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      title={title}
      className={`p-2 rounded-md transition-colors ${
        isActive
          ? 'bg-uwrap-100 text-uwrap-700 dark:bg-uwrap-900/30 dark:text-uwrap-300'
          : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
      } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
    >
      <Icon className="w-4 h-4" />
    </button>
  );
}
