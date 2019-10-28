<template>
  <div class="editor">
    <editor-menu-bar :editor="editor">
      <div class="menubar" slot-scope="{ commands, isActive }">

        <button class="menubar__button" :class="{ 'is-active': isActive.bold() }" @click="commands.bold">
          <v-icon :color="isActive.bold() ? 'black' : 'gray'">format_bold</v-icon>
        </button>

        <button class="menubar__button" :class="{ 'is-active': isActive.italic() }" @click="commands.italic">
          <v-icon :color="isActive.italic() ? 'black' : 'gray'">format_italic</v-icon>
        </button>

        <button class="menubar__button" style="margin-right:25px;" :class="{ 'is-active': isActive.underline() }" @click="commands.underline">
          <v-icon :color="isActive.underline() ? 'black' : 'gray'">format_underline</v-icon>
        </button>

        <button class="menubar__button" :class="{ 'is-active': isActive.code() }" @click="commands.code">
          <v-icon :color="isActive.code() ? 'black' : 'gray'">code</v-icon>
        </button>

        <button class="menubar__button" :class="{ 'is-active': isActive.bullet_list() }" @click="commands.bullet_list">
          <v-icon :color="isActive.bullet_list() ? 'black' : 'gray'">format_list_bulleted</v-icon>
        </button>

        <button class="menubar__button" style="margin-right:25px;" :class="{ 'is-active': isActive.ordered_list() }"
          @click="commands.ordered_list">
          <v-icon :color="isActive.ordered_list() ? 'black' : 'gray'">format_list_numbered</v-icon>
        </button>

        <button class="menubar__button" :class="{ 'is-active': isActive.heading({ level: 1 }) }"
          @click="commands.heading({ level: 1 })">
          <div class="custom-icon" :style=" isActive.heading({ level: 1 }) ? 'color:black;' : 'color:gray;' ">H1</div>
        </button>

        <button class="menubar__button" :class="{ 'is-active': isActive.heading({ level: 2 }) }"
          @click="commands.heading({ level: 2 })">
          <div class="custom-icon" :style=" isActive.heading({ level: 2 }) ? 'color:black;' : 'color:gray;' ">H2</div>
        </button>

        <button class="menubar__button" :class="{ 'is-active': isActive.heading({ level: 3 }) }"
          @click="commands.heading({ level: 3 })">
          <div class="custom-icon" :style=" isActive.heading({ level: 3 }) ? 'color:black;' : 'color:gray;' ">H3</div>

        </button>

      </div>
    </editor-menu-bar>

    <editor-content id="editor" class="editor__content" :editor="editor"/>

  </div>
</template>

<script>
import { Editor, EditorContent, EditorMenuBar } from 'tiptap'
import {
  Blockquote,
  CodeBlock,
  HardBreak,
  Heading,
  HorizontalRule,
  OrderedList,
  BulletList,
  ListItem,
  TodoItem,
  TodoList,
  Bold,
  Code,
  Italic,
  Link,
  Underline,
  History,
} from 'tiptap-extensions'

export default {
  components: {
    EditorContent,
    EditorMenuBar,
  },
  props: ['value'],
  data() {
    return {
      html: '',
      editor: new Editor({
        extensions: [
          new Blockquote(),
          new BulletList(),
          new CodeBlock(),
          new HardBreak(),
          new Heading({ levels: [1, 2, 3] }),
          new HorizontalRule(),
          new ListItem(),
          new OrderedList(),
          new TodoItem(),
          new TodoList(),
          new Bold(),
          new Code(),
          new Italic(),
          new Link(),
          new Underline(),
          new History(),
        ],
        content: this.value,
        onUpdate: ({ getHTML }) => {
          this.$emit('input', getHTML())
        }
      }),
    }
  },
  beforeDestroy() {
    this.editor.destroy()
  },
}
</script>

<style lang="scss" scoped>

.custom-icon {
  font-weight: bold;
  font-size: 18px;
  position: relative;
  bottom: 2px;
  margin-left: 5px;
  color: gray;
}
.menubar{
  text-align: center;
  background-color:	#E8E8E8;
  padding-top:10px;
  padding-bottom:5px;
  border-radius: 5px;
}

.menubar > .menubar__button{
  margin-right: 6px;
 
}

.editor__content{
  margin-top: 10px;
  background-color: #E8E8E8;
  text-align: left;
  border-radius: 5px;
  padding: 1px;
  
}

.ProseMirror {
 min-height: 150px !important;
}

.ProseMirror-textblock {
  min-height: 150px !important;
}

</style>
