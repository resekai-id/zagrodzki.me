import type { NextPage, GetStaticProps } from "next";

import { Layout } from "components/layout/Layout";
import { Seo } from "components/Seo";
import { Hero } from "components/common/hero/Hero";
import { AboutView } from "components/about/AboutView";
import { RESOURCE_TYPE, InferGetStaticPropsType } from "types";
import { getViewsByType } from "lib/views";

const About: NextPage = ({ views }: InferGetStaticPropsType<typeof getStaticProps>) => {
  const description = "Want to know more about me? You've come to the right place 🎓";

  return (
    <Layout>
      <Seo title="About" description={description} imageUrl={"/img/about.png"} />
      <Hero title="About" description={description} />
      <AboutView views={views} />
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  try {
    const views = await getViewsByType(RESOURCE_TYPE.POST);

    return { props: { views }, revalidate: 10 };
  } catch {
    return { props: { views: 0 } };
  }
};

export default About;
