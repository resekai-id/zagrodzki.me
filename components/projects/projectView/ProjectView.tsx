import styles from "./projectView.module.scss";
import { memo } from "react";
import type { Project } from "types";
import { motion } from "framer-motion";
import Image from "next/image";
import GitHubButton from "react-github-btn";
import Arrow from "public/svg/right-top-arrow.svg";
import RightArrow from "public/svg/right-arrow.svg";
import Link from "next/link";
import { useWindowSize } from "hooks/useWindowSize";

type ProjectViewProps = {
  readonly project: Project;
  readonly children: React.ReactNode;
};

export const ProjectView = memo<ProjectViewProps>(({ children, project }) => {
  const { width } = useWindowSize();
  return (
    <article className={styles.wrapper}>
      <header className={styles.header}>
        <div className={styles.info}>
          <div className={styles.path}>
            <Link href="/">
              <a className={styles.link}>Home</a>
            </Link>
            <div className={styles.separator}>
              <RightArrow />
            </div>
            <Link href="/projects">
              <a className={styles.link}>Projects</a>
            </Link>
          </div>
          <motion.h1 layoutId={`title-container-${project.slug}`} className={styles.title}>
            {project.title}
          </motion.h1>
          <motion.p layoutId={`description-container-${project.slug}`} className={styles.description}>
            {project.description}
          </motion.p>
        </div>

        <div className={styles.github}>
          <GitHubButton
            href={project.repoUrl}
            data-icon="octicon-star"
            data-size={width! > 800 ? "large" : ""}
            aria-label={`Star ${project.title} on Github`}
          >
            Star
          </GitHubButton>

          <GitHubButton
            href={`${project.repoUrl}/fork`}
            data-icon="octicon-repo-forked"
            aria-label={`Fork ${project.title} on Github`}
            data-size={width! > 800 ? "large" : ""}
          >
            Fork
          </GitHubButton>
        </div>
      </header>
      <motion.a layoutId={`image-container-${project.slug}`} className={styles.thumbnail} href={project.url}>
        <Image src={`/img/projects/${project.slug}/thumbnail.png`} alt={project.title} width={1200} height={880} />
        <div className={styles.arrow}>
          <Arrow />
        </div>
      </motion.a>

      <div className="content">{children}</div>
    </article>
  );
});

ProjectView.displayName = "ProjectView";