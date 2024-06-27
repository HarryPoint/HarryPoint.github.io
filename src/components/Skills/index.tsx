const skills = [
  ["html5", "original"],
  ["css3", "original"],
  ["babel", "original"],
  ["csharp", "original"],
  ["docker", "original"],
  ["express", "original"],
  ["git", "original"],
  ["gulp", "plain"],
  ["javascript", "original"],
  ["jest", "plain"],
  ["linux", "original"],
  ["mysql", "original"],
  ["nestjs", "original"],
  ["nextjs", "original"],
  ["nginx", "original"],
  ["nodejs", "original"],
  ["nuxtjs", "original"],
  ["photoshop", "original"],
  ["postman", "original"],
  ["puppeteer", "original"],
  ["react", "original"],
  ["redis", "original"],
  ["redux", "original"],
  ["sass", "original"],
  ["typescript", "original"],
  ["vuejs", "original"],
  ["webpack", "original"],
];

export default () => {
  return (
    <>
      {skills.map(([name, type]) => (
        <img
          key={name}
          src={`https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${name}/${name}-${type}.svg`}
          style={{ height: 50 }}
        />
      ))}
    </>
  );
};
