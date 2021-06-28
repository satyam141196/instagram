import React, { Component } from "react";
import { Redirect } from "react-router";
import Post from "../post/Post";
import "./Posts.css";
import Grid from "@material-ui/core/Grid";

export default class Posts extends Component {
  onImageTransfer = (imageId) => {
    return this.props.cb(imageId);
  };
  render() {
    if (
      sessionStorage.getItem("access-token") === undefined ||
      this.props.isLoggedIn === false
    ) {
      return <Redirect to={{ pathname: "/" }} />;
    }

    return (
      <>
        <Grid container spacing={3}>
          {(this.props.totalPosts || []).map((post, index) => (
            <Grid item xl={6} lg={6} md={6} xs={4} sm={3} key={"post#" + index}>
              <Post
                post={post}
                cb={this.props.cb}
                count={index}
                containerId={"post#" + index}
              />
            </Grid>
          ))}
        </Grid>
      </>
    );
  }
}
