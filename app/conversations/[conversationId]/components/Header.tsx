'use client';

import Avatar from "@/app/components/Avatar";
import useOtherUser from "@/app/hooks/useOtherUser";
import { Conversation, User } from "@prisma/client";
import Link from "next/link";
import React, { useMemo, useState } from "react";
import { HiChevronLeft } from "react-icons/hi";
import { HiEllipsisHorizontal, HiEllipsisVertical } from "react-icons/hi2";
import ProfileDrawer from "./ProfileDrawer";
import AvatarGroup from "@/app/components/AvatarGroup";
import useActiveList from "@/app/hooks/useActiveList";

interface HeaderProps {
  conversation: Conversation &{
  users: User[]
  }
}

const Header : React.FC<HeaderProps> = ({ conversation }) => {

  const otherUser = useOtherUser(conversation);
  const[drawerOpen, setDrawerOpen] = useState(false);
  const { members } = useActiveList();
    const isActive = members.indexOf(otherUser?.email!) != -1;
  
  const statusText = useMemo(() => {
    if(conversation.isGroup){
      return `${conversation.users.length} members`;
    }

    return isActive? 'Active':'offline';
  },[conversation, isActive]);

  return ( 
    <>
    <ProfileDrawer data={conversation} isOpen={drawerOpen} onClose={() => setDrawerOpen(false)} />
    <div className="bg-white w-full flex border-b-2 sm:px-4 py-3 px-4 lg:px-6 justify-between items-center shadow-sm">
      <div className="flex gap-3 items-center">
        <Link href='/conversations' className="lg:hidden block text-purple-500 hover:text-purple-600">
          <HiChevronLeft size={40} />
        </Link>
        {conversation.isGroup ? (<AvatarGroup users={conversation.users} />):(<Avatar user={otherUser} />)}
        
        <div className="flex flex-col">
          <div className="">
            {conversation.name || otherUser.name}
          </div>
          <div className="text-sm text-neutral-500 font-normal">
            {statusText}
          </div>
        </div>
      </div>
      <HiEllipsisVertical size={40} onClick={() => setDrawerOpen(true)} className="text-purple-500 cursor-pointer hover:text-purple-800" />
    </div>
    </>
   );
}
 
export default Header;