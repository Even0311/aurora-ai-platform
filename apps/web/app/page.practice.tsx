"use client";

// 导入 React Hooks 和 API 函数
// useState: 管理状态  useRef: 获取 DOM 引用  useEffect: 处理副作用
import { useState, useRef, useEffect } from "react";
import { sendMessage, ChatMessage } from "@/lib/api";

// TypeScript: 给 Message 类型起一个别名，等同于 ChatMessage
// ChatMessage 的结构是: { role: "user" | "assistant", content: string }
type Message = ChatMessage;

export default function Home() {
  // ─────────────────────────────────────────────
  // 【填空 1】状态初始化
  // 提示: messages 是消息列表，初始值是空数组
  //       input 是输入框内容，初始值是空字符串
  //       loading 表示是否正在等待 AI 回复，初始值是 false
  //       error 存错误信息，初始值是 null
  // ─────────────────────────────────────────────
  const [messages, setMessages] = useState<Message[]>(/* 填空 1a: 初始值? */);
  const [input, setInput] = useState(/* 填空 1b: 初始值? */);
  const [loading, setLoading] = useState(/* 填空 1c: 初始值? */);
  const [error, setError] = useState<string | null>(/* 填空 1d: 初始值? */);

  // ─────────────────────────────────────────────
  // 【填空 2】useRef
  // 提示: 用来获取消息列表底部那个 div 的 DOM 引用
  //       这样我们才能让页面自动滚动到最新消息
  // ─────────────────────────────────────────────
  const bottomRef = useRef<HTMLDivElement>(/* 填空 2: useRef 的初始值是什么? */);

  // ─────────────────────────────────────────────
  // 【填空 3】useEffect — 自动滚动到底部
  // 提示: 每当 messages 变化时，把底部 div 滚动进视野
  //       scrollIntoView({ behavior: "smooth" }) 可以实现平滑滚动
  //       注意: bottomRef.current 可能是 null，要用 ?. 安全访问
  // ─────────────────────────────────────────────
  useEffect(() => {
    /* 填空 3a: 写一行代码，让 bottomRef.current 平滑滚动进视野 */
  }, [/* 填空 3b: 依赖数组填什么？（哪个状态变化时需要触发滚动？） */]);

  // ─────────────────────────────────────────────
  // 【填空 4】发送消息的函数
  // ─────────────────────────────────────────────
  async function handleSend() {
    // 步骤 1: 去掉输入内容两端的空格
    const text = /* 填空 4a: 对 input 调用哪个字符串方法去除首尾空格? */;

    // 步骤 2: 如果内容为空 或者 正在加载，直接返回，不做任何事
    /* 填空 4b: 写一行 if 判断，不满足条件就 return */

    // 步骤 3: 清空输入框，清空错误信息
    setInput(/* 填空 4c */);
    setError(/* 填空 4d */);

    // 步骤 4: 把用户消息追加到 messages 列表
    // 提示: setMessages 接收一个函数 (prev) => 新数组
    //       用展开运算符 [...prev, 新消息] 追加，不要直接 push
    //       新消息格式: { role: "user", content: text }
    setMessages((prev) => /* 填空 4e: 返回追加了用户消息的新数组 */);

    // 步骤 5: 设置 loading 为 true，表示开始等待 AI
    /* 填空 4f */

    try {
      // 步骤 6: 调用 sendMessage(text, messages) 发送请求
      // 提示: sendMessage 是异步函数，要用 await
      //       返回值 data 里有 data.reply 字段
      const data = /* 填空 4g: await 调用 sendMessage */;

      // 步骤 7: 把 AI 的回复追加到 messages
      // 提示: 格式和步骤 4 类似，但 role 是 "assistant"，content 是 data.reply
      setMessages((prev) => /* 填空 4h */);
    } catch (err) {
      // 步骤 8: 出错时，把错误信息存到 error 状态
      // 提示: 判断 err 是否是 Error 实例，是的话取 err.message，否则用默认字符串
      setError(/* 填空 4i: err instanceof Error ? ... : ... */);
    } finally {
      // 步骤 9: 无论成功还是失败，都要把 loading 设回 false
      /* 填空 4j */
    }
  }

  // ─────────────────────────────────────────────
  // 【填空 5】键盘事件处理
  // 提示: 当用户按下 Enter 键时，调用 handleSend()
  // TypeScript 注解: e 的类型是 React.KeyboardEvent<HTMLInputElement>，可以不管它，照着写就行
  // ─────────────────────────────────────────────
  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (/* 填空 5: 判断按下的是哪个键？用 e.key 比较 */) handleSend();
  }

  // ─────────────────────────────────────────────
  // JSX 部分（页面结构已给出，填完逻辑就能看到效果）
  // ─────────────────────────────────────────────
  return (
    <div className="flex flex-col h-screen max-w-2xl mx-auto px-4 py-6">
      <h1 className="text-xl font-semibold mb-4">Aurora AI Chat</h1>

      {/* 消息列表区域 */}
      <div className="flex-1 overflow-y-auto space-y-3 mb-4">

        {/* 还没有消息时显示提示文字 */}
        {messages.length === 0 && (
          <p className="text-gray-400 text-sm">Send a message to get started.</p>
        )}

        {/* ─────────────────────────────────────────────
            【填空 6】渲染消息列表
            提示: 用 messages.map((msg, i) => ...) 遍历
                  每条消息渲染一个 div，key 用 i
                  className 需要根据 msg.role 动态切换：
                    - "user"      → "bg-blue-600 text-white self-end ml-auto"
                    - "assistant" → "bg-gray-100 text-gray-900"
                  其余固定 class: "px-4 py-2 rounded-lg max-w-prose whitespace-pre-wrap text-sm"
                  div 内容显示 msg.content
            ───────────────────────────────────────────── */}
        {/* 填空 6: 在这里写 messages.map(...) */}

        {/* loading 时显示"Thinking..." */}
        {loading && (
          <div className="bg-gray-100 text-gray-400 px-4 py-2 rounded-lg text-sm max-w-prose">
            Thinking...
          </div>
        )}

        {/* 有错误时显示错误信息 */}
        {error && (
          <div className="bg-red-50 text-red-600 px-4 py-2 rounded-lg text-sm max-w-prose">
            Error: {error}
          </div>
        )}

        {/* 这个空 div 用于自动滚动定位，ref 绑定到 bottomRef */}
        <div ref={bottomRef} />
      </div>

      {/* 输入区域 */}
      <div className="flex gap-2">
        <input
          type="text"
          className="flex-1 border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Type a message..."
          value={input}
          // 输入框内容变化时更新 input 状态
          onChange={(e) => setInput(e.target.value)}
          // 按键事件绑定到 handleKeyDown
          onKeyDown={handleKeyDown}
          // loading 时禁用输入框
          disabled={loading}
        />
        <button
          onClick={handleSend}
          // loading 中或输入为空时禁用按钮
          disabled={loading || !input.trim()}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm disabled:opacity-50 hover:bg-blue-700 transition-colors"
        >
          Send
        </button>
      </div>
    </div>
  );
}
