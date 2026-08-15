import IconCloud from "./ui/icon-cloud";

const slugs = [
  "java",
  "springboot",
  "hibernate",
  "react",
  "javascript",
  "html5",
  "css3",
  "tailwindcss",
  "mysql",
  "postgresql",
  "git",
  "github",
  "postman",
  "apachemaven",
  "intellijidea",
  "visualstudiocode",
  "leetcode",
  "hackerrank",
  "c",
  "docker",
  "vercel",
  "vite",
];

function IconCloudDemo() {
  return (
    <div className="relative flex size-full max-w-lg items-center justify-center overflow-hidden rounded-lg  px-20 pb-20 pt-8 bg-transparent">
      <IconCloud iconSlugs={slugs} />
    </div>
  );
}

export default IconCloudDemo;
