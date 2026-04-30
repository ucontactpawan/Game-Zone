import "./StaticPage.css";

const POSTS = [
  {
    date: "Apr 28, 2026",
    tag: "Update",
    tagColor: "green",
    title: "Memory Card Game is Now Live! 🃏",
    excerpt:
      "Our second game has launched! Flip cards, find pairs, and beat your best time. We've added a smooth 3D flip animation and a live timer to keep things exciting.",
    readTime: "2 min read",
  },
  {
    date: "Apr 15, 2026",
    tag: "Dev Log",
    tagColor: "blue",
    title: "How We Built Snake in Pure React",
    excerpt:
      "A deep dive into building a classic Snake game using only React hooks and a setInterval game loop — no canvas, no game engine, just JSX and CSS Grid.",
    readTime: "5 min read",
  },
  {
    date: "Apr 1, 2026",
    tag: "Announcement",
    tagColor: "purple",
    title: "Welcome to GameZone 🎮",
    excerpt:
      "We're launching GameZone — a free browser games platform built with React. Our goal: bring classic arcade fun back to the web, with zero downloads and zero sign-ups.",
    readTime: "3 min read",
  },
  {
    date: "Mar 20, 2026",
    tag: "Roadmap",
    tagColor: "orange",
    title: "What's Coming Next: Tetris, 2048, Wordle & More",
    excerpt:
      "Here's a sneak peek at the games we're building next. Tetris is nearly done, 2048 is in design, and we have some surprises planned for Q3.",
    readTime: "4 min read",
  },
];

const TAG_COLORS = {
  green: "#16a34a",
  blue: "#2563eb",
  purple: "#7c3aed",
  orange: "#ea580c",
};

export default function BlogPage({ onBack }) {
  return (
    <div className="static-page">
      <div className="static-page__inner">
        <button className="static-page__back" onClick={onBack}>
          ← Back
        </button>

        <div className="static-page__hero">
          <span className="static-page__hero-icon">📝</span>
          <h1 className="static-page__title">Blog</h1>
          <p className="static-page__lead">
            Updates, dev logs, and announcements from the GameZone team.
          </p>
        </div>

        <div className="blog-posts">
          {POSTS.map((post) => (
            <article key={post.title} className="blog-post">
              <div className="blog-post__meta">
                <span
                  className="blog-post__tag"
                  style={{ background: TAG_COLORS[post.tagColor] }}
                >
                  {post.tag}
                </span>
                <span className="blog-post__date">{post.date}</span>
                <span className="blog-post__read">{post.readTime}</span>
              </div>
              <h2 className="blog-post__title">{post.title}</h2>
              <p className="blog-post__excerpt">{post.excerpt}</p>
              <button className="blog-post__read-btn">Read more →</button>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
