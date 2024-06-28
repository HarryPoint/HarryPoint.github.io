import "gitalk/dist/gitalk.css";
import GitalkComponent from "gitalk/dist/gitalk-component";
import CryptoJS from "crypto-js";
import { useEffect, useState } from "react";
import styles from "./styles.module.css";

export default function Gitalk(props) {
  // 使用状态来控制GitalkComponent的渲染
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // 组件挂载后设置isClient为true
    setIsClient(true);
  }, []);
  return isClient ? (
    <div className={styles.wrapper}>
      <GitalkComponent
        options={{
          clientID: "Ov23lit1eRiiNbsLJ8xv",
          clientSecret: "a34e6c82b96b311284d30adc5d82d258691f73b9",
          repo: "gitalk-store", // The repository of store comments,
          owner: "HarryPoint",
          admin: ["HarryPoint"],
          // proxy:
          //   "https://cors-anywhere.azm.workers.dev/https://github.com/login/oauth/access_token",
          id: CryptoJS.MD5(location.pathname).toString(), // Ensure uniqueness and length less than 50
          distractionFreeMode: false, // Facebook-like distraction free mode
        }}
      />
    </div>
  ) : null;
}
