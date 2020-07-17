exports.searchTypes = {
    passages: "passages",
    keyword: "keyword",
};

exports.keywordSearchResultsInitial = {
    total_results: 0,
    results: [
      {
        reference: "",
        content: ""
      },
    ],
  };

  exports.passageSearchResultsInitial = {
    passage_meta: [
      {
        canonical: "",
        chapter_start: [],
        chapter_end: [],
        prev_verse: 0,
        next_verse: 0,
        prev_chapter: [],
        next_chapter: []
      }
    ],
    passages: "",
  };