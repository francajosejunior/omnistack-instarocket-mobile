import React, {
  useState,
  useContext,
  useEffect,
  useCallback,
  useMemo
} from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList
} from "react-native";
import api from "./../services/api";
import io from "socket.io-client";
import { URL_API } from "../config";

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
    <View style={styles.container}>
      <FlatList
        data={feed}
        keyExtractor={post => post._id}
        renderItem={({ item }) => (
          <View style={styles.feedItem}>
            <View style={styles.feedItemHeader}>
              <View style={styles.userInfo}>
                <Text style={styles.name}>{item.author}</Text>
                <Text style={styles.place}>{item.place}</Text>
              </View>
              <Image source={more} />
            </View>
            <Image
              style={styles.feedImage}
              source={{ uri: `${URL_API}/files/${item.image}` }}
            />
            <View style={styles.feedItemFooter}>
              <View style={styles.actions}>
                <TouchableOpacity
                  style={styles.action}
                  onPress={() => {
                    handleLike(item._id);
                  }}
                >
                  <Image source={like} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.action} onPress={() => {}}>
                  <Image source={comment} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.action} onPress={() => {}}>
                  <Image source={send} />
                </TouchableOpacity>
              </View>
              <Text style={styles.likes}> {item.likes} curtidas</Text>
              <Text style={styles.description}> {item.description} </Text>
              <Text style={styles.hashtags}> {item.hashtags} </Text>
            </View>
          </View>
        )}
      />
      {/* {feed.map(post => (
        <Text key={post._id}>{post.description}</Text>
      ))} */}
    </View>
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

const styles = StyleSheet.create({
  container: { flex: 1 },

  feedItem: { marginTop: 20 },

  feedItemHeader: {
    paddingHorizontal: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },

  userInfo: {},

  name: { fontSize: 14, color: "#000" },

  place: { fontSize: 12, color: "#555", marginTop: 2 },

  feedImage: {
    width: `100%`,
    height: 400,
    marginVertical: 15
  },

  feedItemFooter: {
    paddingHorizontal: 15
  },

  actions: { flexDirection: "row" },

  likes: { marginTop: 15, fontWeight: "bold", color: "#000" },

  description: {
    lineHeight: 18,
    color: "#000"
  },

  hashtags: { color: "#7159c1" },

  action: {
    marginRight: 8
  }
});

export default Feed;
