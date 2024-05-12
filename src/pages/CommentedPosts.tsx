import { supabase } from "backend";
import { FC, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "store";
import styled from "styled-components";
import PostCard from "../components/PostCard";

const CommentedPosts: FC = () => {
    const [data, setData] = useState<any[]>()
    const user = useSelector((state: RootState) => state.user.data);

    if (!user?.id) return;

    useEffect(() => {
        supabase.from("posts")
            .select(
                `*, user: user_metadata(*), views(count), likes: post_reactions(count), comments: comments(count), commented: comments!inner()`
            )
            .eq("likes.type", "like").eq('commented.user_id', user?.id).order("id", { ascending: false }).then((res) => {
                if (res.data) {
                    setData(res.data)
                }
            })

    }, [])

    return (
        <Container>
            <Content>
                <h1 className="title">Commented Posts</h1>
                <div className="list">
                    {data?.map((e, idx) => {
                        return <div className="list-item" key={idx}>
                            <PostCard elem={e} />
                        </div>
                    })}
                    {!data || data?.length === 0 ? <span>No post commented</span> : null}
                </div>
            </Content>
        </Container>
    )
}

export default CommentedPosts;

const Container = styled.div`
    margin: 0 auto;
    max-width: 1000px;
`
const Content = styled.div`
   .title{
    font-size: 35px;
    font-family: var(--font-medium);
    text-align: center;
    margin: 30px 0;
   }
`