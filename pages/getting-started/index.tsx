import Head from 'next/head'
import Link from 'next/link'
import {
  Heading,
  Flex,
  Stack,
  Divider,
  Button,
  Text,
  Box,
  Image,
} from '@chakra-ui/react'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { ContentBanner } from '../../components/ContentBanner'

interface LessonProps {
  lessons: {
    frontMatter: any
    slug: string
  }[]
}

const GettingStarted: React.FC<LessonProps> = ({ lessons }) => {
  return (
    <>
      <Head>
        <title>D_D School of Code</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Flex as="main" py={5} px={[4, 10, 16]} direction="column" minH="100vh">
        <Stack spacing={5} direction="column">
          <Heading
            as="h2"
            fontSize="3xl"
            textAlign="center"
            color="#F96C9D"
            apply="mdx.h2"
          >
            Getting Started
          </Heading>
          <Divider />
          <Heading
            apply="mdx.h3"
            as="h3"
            fontSize="2xl"
            textAlign="center"
            p={5}
          >
            What is School of Code?
          </Heading>
          <Text apply="mdx.p" as="p" fontSize="xl">
            GM!{' '}
            <Text fontWeight="bold" as="i">
              Developer DAO School of Code
            </Text>{' '}
            is an open-source education platform.
            <br />
            We seek to{' '}
            <Text fontWeight="bold" as="strong" color="#F96C9D">
              empower learners
            </Text>{' '}
            with knowledge and tools that can be applied to real-world projects
            while{' '}
            <Text fontWeight="bold" as="strong">
              promoting a healthy learning environment.
            </Text>
            <br />
            <br />
            Read more at{' '}
            <Link href="https://ddschoolofcode.arweave.dev/">
              <Text as="u">ddschoolofcode.arweave.dev</Text>
            </Link>
            .
          </Text>
          <Divider />
          <Heading
            apply="mdx.h3"
            as="h3"
            fontSize="2xl"
            textAlign="center"
            p={5}
          >
            Highlights of Resources
          </Heading>
          <Image
            src="/assets/getting-started/img_1.png"
            alt="highlights of resources"
          />
          <Divider />
          <Heading
            apply="mdx.h3"
            as="h3"
            fontSize="2xl"
            textAlign="center"
            p={5}
          >
            Roadmap
          </Heading>
          <Image
            src="/assets/getting-started/img_2.png"
            alt="3 month roadmap"
          />
          <Divider />
          <Heading
            apply="mdx.h3"
            as="h3"
            fontSize="2xl"
            textAlign="center"
            p={5}
          >
            Current Lessons
          </Heading>
          <Divider />
          {lessons.map((lesson: any, idx: number) => (
            <Link key={lesson.slug} href={'/lessons/' + lesson.slug} passHref>
              {/* <ContentBanner lesson={lesson} idx={idx} /> */}
              <Button>
                Lesson&nbsp;{lesson.slug}:&nbsp;{lesson.frontMatter.title}
              </Button>
            </Link>
          ))}
          <Divider />
          <Heading
            apply="mdx.h3"
            as="h3"
            fontSize="2xl"
            textAlign="center"
            p={5}
          >
            How to send feedback
          </Heading>
        </Stack>
      </Flex>
    </>
  )
}

export default GettingStarted

export const getStaticProps = async () => {
  const files = fs.readdirSync(path.join('lessons'))
  const lessons = files.map((filename) => {
    const markdownWithMeta = fs.readFileSync(
      path.join('lessons', filename),
      'utf-8',
    )
    const { data: frontMatter } = matter(markdownWithMeta)
    return {
      frontMatter,
      slug: filename.split('.')[0],
    }
  })
  return {
    props: {
      lessons,
    },
  }
}
