import styles from "./projectsListing.module.scss";
import { useCallback, useState } from "react";
import type { Project } from "types";
import { ProjectThumbnail } from "components/projects/projectsListing/projectThumbnail/ProjectThumbnail";
import { SearchBox } from "components/searchBox/SearchBox";
import algoliasearch from "algoliasearch";
import { InstantSearch, connectHits } from "react-instantsearch-dom";
import type { HitsProvided } from "react-instantsearch-core";

const searchClient = algoliasearch(
  process.env.NEXT_PUBLIC_ALGOLIA_APP_ID!,
  process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_KEY!,
);

interface CustomHitsProps extends HitsProvided<Project> {
  readonly currentObjectID: string | null;
  readonly setObjectId: (objectId: string) => void;
}

export const CustomHits = connectHits<CustomHitsProps, Project>(({ hits, currentObjectID }) => {
  return (
    <ol id="search-hits-list" className={styles.list}>
      {hits.map((hit) => (
        <li
          key={hit.objectID}
          role="option"
          aria-describedby="search-details"
          aria-selected={currentObjectID === hit.objectID ? "true" : "false"}
          id={"id" + hit.objectID}
          className={styles.hit}
        >
          <ProjectThumbnail project={hit} />
        </li>
      ))}
    </ol>
  );
});

export const ProjectsListing = () => {
  const [currentObjectID, setObjectId] = useState<string | null>(null);

  const handleInputChange = useCallback(() => {
    setTimeout(() => setObjectId(null), 0);
  }, []);

  return (
    <div className={styles.projects}>
      <InstantSearch indexName="projects" searchClient={searchClient}>
        <div className={styles.hero}>
          <h1 className={styles.title}>Projects</h1>
          <p className={styles.description}>Everything that I have built, alone or with someone 🔨</p>
          <SearchBox currentObjectID={currentObjectID} onChange={handleInputChange} />
        </div>
        <CustomHits currentObjectID={currentObjectID} setObjectId={setObjectId} />
      </InstantSearch>
    </div>
  );
};

ProjectsListing.displayName = "ProjectsListing";