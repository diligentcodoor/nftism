import ReactAudioPlayer from "react-audio-player";

interface Props {
  src: string;
}

const BlogAudio: React.FC<Props> = ({ src }) => (
  <ReactAudioPlayer src={src} controls style={{ width: "100%" }} />
);

export default BlogAudio;
