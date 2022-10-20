import axios from "axios";
import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import { useEffect, useState } from "react";

const Home: NextPage = (props) => {
  const [value, setValue] = useState("");

  useEffect(() => {
    const fetch = async () => {
      try {
        const uri = "https://api.docker-ssl.dev";
        const { data } = await axios.get(uri);

        setValue(JSON.stringify(data));
      } catch (error) {
        setValue(JSON.stringify(error));
      }
    };

    fetch();
  }, []);

  return (
    <div className={styles.container}>
      <Head>
        <title>Docker-SSL</title>
        <meta name="description" content="DOCKER WITH SSL LOCALHOST" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>Docker with SSL in LOCALHOST</h1>
        <h2>Request from server:</h2>
        <p>{JSON.stringify(props)}</p>
        <h2>Request from client:</h2>
        <p>{JSON.stringify(value)}</p>
      </main>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const uri = "https://api.docker-ssl.dev";
    const { data } = await axios.get(uri);

    return {
      props: {
        data,
      },
    };
  } catch (error) {
    return {
      props: {
        data: JSON.stringify(error),
      },
    };
  }
};

export default Home;
