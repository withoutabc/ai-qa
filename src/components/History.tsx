import { SearchOutlined } from '@ant-design/icons';
import { Input } from 'antd';
import { useState } from 'react';

import ai_avator from '@/conversation_icon/ai_avator.png';
import close_history from '@/conversation_icon/close_history.png';
import USER_avator from '@/conversation_icon/USER.png';
import { AI, useConversationStore } from '@/store';
import { DealAnswer } from '@/utils/DealAnswer';
const { Search } = Input;
export default function History({
  handleClose,
}: {
  handleClose: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const conversations = useConversationStore((state) => state.conversation);
  const converTitle = useConversationStore((state) => state.title);
  const [filterStr, setFilterStr] = useState<string>('');
  return (
    <div className="popup-shadow absolute left-[50%] top-[50%] h-[500px] w-[800px] translate-x-[-50%] translate-y-[-50%] rounded-xl bg-bg-history">
      <div className="flex  items-center justify-between  rounded-t-xl bg-white p-[15px] text-lg">
        <span className=" translate-x-[250px] self-center">{converTitle}</span>
        <img
          src={close_history}
          alt=""
          className="h-[20px] w-[20px] "
          onClick={() => {
            handleClose(false);
          }}
        />
      </div>
      <div className="p-5">
        <Search
          className="w-[500px]  bg-white"
          placeholder="搜索历史记录"
          addonBefore={<SearchOutlined></SearchOutlined>}
          onSearch={(value) => {
            console.log(value);

            setFilterStr(value);
          }}
        />
      </div>
      <div className="flex h-[370px] flex-col overflow-y-scroll px-5">
        {conversations
          .filter((item) => {
            const conversationValues = Object.values(item);
            return (conversationValues[0] as string).includes(filterStr);
          })
          .map((conversation, index) => {
            const conversationValues = Object.values(conversation); //0是对话内容，1是时间
            const conversationKeys = Object.keys(conversation);
            return (
              <div className="flex flex-row space-x-5 " key={index}>
                <img
                  src={conversationKeys[0] === 'AI' ? ai_avator : USER_avator}
                  alt=""
                  className="h-[57px] w-[57px] rounded-[28.5px]"
                />
                <div className="flex flex-col ">
                  <div className="mb-3 text-sm text-time-font">
                    {conversationValues[1] as string}
                  </div>
                  <div>
                    {conversationKeys[0] === 'HUMAN'
                      ? (conversationValues[0] as string)
                      : DealAnswer(conversationValues[0] as AI)}
                  </div>
                  <div className=" my-[25px]  h-[1px] bg-bg-divider"></div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}
