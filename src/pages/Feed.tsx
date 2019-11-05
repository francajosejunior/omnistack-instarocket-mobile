import React, { useEffect, useState } from "react";
import { FlatList, Image, TouchableOpacity, View } from "react-native";
import io from "socket.io-client";
import { URL_API } from "../config";
import api from "./../services/api";
import {
  Action,
  Actions,
  Container,
  Description,
  FeedImage,
  FeedItem,
  FeedItemFooter,
  FeedItemHeader,
  Hashtags,
  Likes,
  Name,
  Place
} from "./Feed.css";

const camera = require("./../assets/camera.png");
const more = require("./../assets/more.png");
const like = require("./../assets/like.png");
const comment = require("./../assets/comment.png");
const send = require("./../assets/send.png");

interface FeedProps extends React.FC {
  navigationOptions: ({  }: any) => any;
}

const Feed: FeedProps = () => {
  const [feed, setFeed] = useState<Array<any>>([]);
  useEffect(() => {
    api.get("/posts").then(response => setFeed(response.data));
  }, [setFeed]);

  useEffect(() => {
    const socket = io(URL_API);

    socket.on("post", newPost => {
      setFeed([newPost, ...feed]);
    });

    socket.on("like", likedPost => {
      setFeed(feed => {
        const maped = feed.map(post => {
          const ret = post._id === likedPost._id ? likedPost : post;

          return ret;
        });

        return maped;
      });
    });
  }, []);

  const handleLike = id => {
    api.post(`/posts/${id}/like`);
  };

  return (
    <Container>
      <FlatList
        data={feed}
        keyExtractor={post => post._id}
        renderItem={({ item }) => (
          <FeedItem>
            <FeedItemHeader>
              <View>
                <Name>{item.author}</Name>
                <Place>{item.place}</Place>
              </View>
              <Image source={more} />
            </FeedItemHeader>
            <FeedImage source={{ uri: `${URL_API}/files/${item.image}` }} />
            <FeedItemFooter>
              <Actions>
                <Action
                  onPress={() => {
                    handleLike(item._id);
                  }}
                >
                  <Image source={like} />
                </Action>
                <Action onPress={() => {}}>
                  <Image source={comment} />
                </Action>
                <Action onPress={() => {}}>
                  <Image source={send} />
                </Action>
              </Actions>
              <Likes> {item.likes} curtidas</Likes>
              <Description> {item.description} </Description>
              <Hashtags> {item.hashtags} </Hashtags>
            </FeedItemFooter>
          </FeedItem>
        )}
      />
      {/* {feed.map(post => (
        <Text key={post._id}>{post.description}</Text>
      ))} */}
    </Container>
  );
};

Feed.navigationOptions = ({ navigation }) => ({
  headerRight: (
    <TouchableOpacity
      style={{ marginRight: 20 }}
      onPress={() => navigation.navigate("New")}
    >
      <Image source={camera} />
    </TouchableOpacity>
  )
});

export default Feed;
