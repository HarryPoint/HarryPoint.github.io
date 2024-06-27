import React, { useEffect, useState } from "react";
import DocItem from "@theme-original/DocItem";
import type DocItemType from "@theme/DocItem";
import type { WrapperProps } from "@docusaurus/types";
import "gitalk/dist/gitalk.css";
import GitalkComponent from "gitalk/dist/gitalk-component";

type Props = WrapperProps<typeof DocItemType>;

export default function DocItemWrapper(props: Props): JSX.Element {
  // 使用状态来控制GitalkComponent的渲染
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // 组件挂载后设置isClient为true
    setIsClient(true);
  }, []);
  return (
    <>
      <DocItem {...props} />
      {isClient && (
        <GitalkComponent
          options={{
            clientID: "Ov23lit1eRiiNbsLJ8xv",
            clientSecret: "a34e6c82b96b311284d30adc5d82d258691f73b9",
            repo: "gitalk-store", // The repository of store comments,
            owner: "HarryPoint",
            admin: [
              "GitHub repo owner and collaborators, only these guys can initialize github issues",
            ],
            proxy:
              "https://cors-anywhere.azm.workers.dev/https://github.com/login/oauth/access_token",
            // id: location.pathname, // Ensure uniqueness and length less than 50
            distractionFreeMode: false, // Facebook-like distraction free mode
          }}
        />
      )}
    </>
  );
}
