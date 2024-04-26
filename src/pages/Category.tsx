import { supabase } from "backend";
import { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

const Category: FC = () => {
  const category = useParams()?.category;
  const [data, setData] = useState<any>();

  useEffect(() => {
    async function fetch() {
      if (category) {
        supabase
          .from("posts")
          .select(
            `*, user: user_metadata(*), likes: post_reactions(count), dislikes: post_reactions(count), comments: comments(count)`
          )
          .ilike("category", category)
          .eq("likes.type", "like")
          .eq("dislikes.type", "like")
          .order("id", { ascending: false })
          .then((response) => {
            if (response) {
              setData(response.data);
            }
          });
      }
    }

    fetch();
  }, []);

  console.log(data);

  return <Container></Container>;
};

export default Category;

const Container = styled.div``;
