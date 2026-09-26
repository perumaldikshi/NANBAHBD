export default function Timeline({ items }) {
  return <div className="timeline">{items.map((item) => <article key={item.year}><span>{item.year}</span><div><h3>{item.title}</h3><p>{item.text}</p></div></article>)}</div>
}
