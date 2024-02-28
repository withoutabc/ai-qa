import { UserOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { useState } from 'react';

import { useConversationStore } from '@/store';

const buttons = [
  { title: '默认', categories: 'common' },
  { title: '景点', categories: 'attraction' },
  { title: '人文历史', categories: 'human' },
  { title: '美食', categories: 'food' },
  { title: '交通', categories: 'transport' },
  { title: '乡村旅游', categories: 'tour' },
  { title: '网红/热门', categories: 'hot' },
];
export default function AiIdentity({
  handleChooseIdentity,
}: {
  handleChooseIdentity: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [identityId, setIdentityId] = useState(0);
  const setIdentity = useConversationStore((state) => state.setIdentity);

  return (
    <div className="height-[50%]  absolute left-[15%]  h-[250px] w-[40vw] translate-x-[50%] translate-y-[70%] bg-default-bg">
      <div className="space-x-3 pl-6 pt-5">
        <span className="text-lg">AI身份选择</span>
        <span className="text-sm">
          针对问题选择合适的AI，能获得更贴切的答案哦
        </span>
      </div>
      <div className="grid grid-cols-3 gap-4 px-8 py-4">
        {buttons.map((button, index) => {
          return (
            <Button
              disabled={index === identityId}
              size="large"
              key={index}
              onClick={() => {
                setIdentityId(index);
              }}
              icon={<UserOutlined />}
            >
              {button.title}
            </Button>
          );
        })}
      </div>
      <Button
        size="large"
        className="mx-[15vw] w-[10vw]"
        onClick={() => {
          setIdentity(buttons[identityId].categories);
          handleChooseIdentity(true);
        }}
      >
        确定
      </Button>
    </div>
  );
}
