import { Component } from "react";

interface ContentProps {
  className?: string;
  results: string;
}

export default class Content extends Component<ContentProps> {
  render() {
    const baseClass = this.props.className || "content";
    const { results } = this.props;
    return <section className={baseClass}>{results}</section>;
  }
}
