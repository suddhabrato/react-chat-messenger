import React from "react";
import MessageImage from "./MessageImage";
import MessageText from "./MessageText";

const MessagesList = () => {
  return (
    <div className="bg-base-200 w-full h-full p-4 lg:p-6 overflow-y-auto">
      <MessageText
        avatar={"https://placeimg.com/192/192/people"}
        author={"Anakin "}
        body={"I hate yousdsdsdsdgggggggggggggggggggggggggggggggg!"}
        seenTime={"12:46"}
        sentTime={"12:46"}
        self={true}
      />
      <MessageText
        avatar={"https://placeimg.com/192/192/people"}
        author={"Anakin "}
        body={"I hate you!"}
        seenTime={"12:46"}
        sentTime={"12:46"}
        self={true}
      />
      <MessageText
        avatar={"https://placeimg.com/192/192/people"}
        author={"Anakin "}
        body={"I hate you!"}
        seenTime={"12:46"}
        sentTime={"12:46"}
        self={false}
      />
      <MessageText
        avatar={"https://placeimg.com/192/192/people"}
        author={"Anakin "}
        body={"I hate you!"}
        seenTime={"12:46"}
        sentTime={"12:46"}
        self={false}
      />
      <MessageText
        avatar={"https://placeimg.com/192/192/people"}
        author={"Anakin "}
        body={"I hate you!"}
        seenTime={"12:46"}
        sentTime={"12:46"}
        self={true}
      />
      <MessageText
        avatar={"https://placeimg.com/192/192/people"}
        author={"Anakin "}
        body={"I hate you!"}
        seenTime={"12:46"}
        sentTime={"12:46"}
        self={true}
      />
      <MessageText
        avatar={"https://placeimg.com/192/192/people"}
        author={"Anakin "}
        body={"I hate you!"}
        seenTime={"12:46"}
        sentTime={"12:46"}
        self={true}
      />
      <MessageText
        avatar={"https://placeimg.com/192/192/people"}
        author={"Anakin "}
        body={"I hate you!"}
        seenTime={"12:46"}
        sentTime={"12:46"}
        self={true}
      />
      <MessageText
        avatar={"https://placeimg.com/192/192/people"}
        author={"Anakin "}
        body={"I hate you!"}
        seenTime={"12:46"}
        sentTime={"12:46"}
        self={true}
      />
      <MessageText
        avatar={"https://placeimg.com/192/192/people"}
        author={"Anakin "}
        body={"I hate you!"}
        seenTime={"12:46"}
        sentTime={"12:46"}
        self={true}
      />
      <MessageImage
        avatar={"https://placeimg.com/192/192/people"}
        author={"Anakin "}
        body={
          "I hate y222222 2 2 32 32asd asd s as as das sda as das das d s sasd asd as das das dd sssssssssssssssssssssssssssssssssss ssssssss sssssssssss sssss ssssssss sssssssssssssss s 32 32 3222 2 ads asd as das ou!"
        }
        seenTime={"12:46"}
        sentTime={"12:46"}
        self={true}
        image={
          "https://images.pexels.com/photos/11845518/pexels-photo-11845518.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        }
      />
      <MessageImage
        avatar={"https://placeimg.com/192/192/people"}
        author={"Anakin "}
        body={""}
        seenTime={"12:46"}
        sentTime={"12:46"}
        self={false}
        image={
          "https://images.pexels.com/photos/11845518/pexels-photo-11845518.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        }
      />
    </div>
  );
};

export default MessagesList;
