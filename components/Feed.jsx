'use client'

import { useState, useEffect } from 'react'
import PromptCard from './PromptCard'

const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <>
      {data.length > 0 ? (
        <div className="mt-16 prompt_layout">
          {data.map((post) => (
            <PromptCard
              key={post._id}
              post={post}
              handleTagClick={handleTagClick}
            />
          ))}
        </div>
      ) : (
        <div className="mt-16 prompt_layout">
          <h1>No Prompt found!</h1>
        </div>
      )}
    </>
  )
}

const Feed = () => {
  const [searchText, setSearchText] = useState('')
  const [posts, setPosts] = useState([])
  const [searchTimeout, setSearchTimeout] = useState(null)
  const [searchedResults, setSearchedResults] = useState([])

  // const handleSearchChange = (e) => {
  //   const query = e.target.value
  //   let filteredPosts = [...posts]

  //   if (query !== '') {
  //     filteredPosts = filteredPosts.filter((post) => {
  //       if (post['prompt'].toLowerCase().indexOf(query.toLowerCase()) !== -1) {
  //         return post
  //       }
  //     })

  //     setPosts(filteredPosts)
  //   }

  //   setSearchText(query)
  // }

  const filterPrompts = (searchtext) => {
    const regex = new RegExp(searchtext, 'i') // 'i' flag for case-insensitive search
    return posts.filter(
      (item) =>
        regex.test(item.creator.username) ||
        regex.test(item.tag) ||
        regex.test(item.prompt),
    )
  }

  const handleSearchChange = (e) => {
    clearTimeout(searchTimeout)
    setSearchText(e.target.value)

    // debounce method
    setSearchTimeout(
      setTimeout(() => {
        const searchResult = filterPrompts(e.target.value)
        setSearchedResults(searchResult)
      }, 200),
    )
  }

  // console.log(posts)
  // console.log(filteredPosts)

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch('/api/prompt')
      const data = await response.json()
      setPosts(data)
    }

    // fetchPosts()
    if (searchText === '') {
      fetchPosts()
    }
  }, [searchText])

  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          type="text"
          placeholder="Search for a tag or a username..."
          value={searchText || ''}
          onChange={handleSearchChange}
          required
          className="search_input peer"
        />
      </form>

      {/* All Prompts */}
      {searchText ? (
        <PromptCardList data={searchedResults} handleTagClick={() => {}} />
      ) : (
        <PromptCardList data={posts} handleTagClick={() => {}} />
      )}
    </section>
  )
}

export default Feed
