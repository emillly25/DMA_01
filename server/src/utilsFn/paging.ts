//paging 함수만들기
function paging(page: number, totalNotice: number) {
  const maxNotice = 3;
  const maxPage = 3;
  let currentPage = page ? page : 1;
  const hideNotice = page === 1 ? 0 : (page - 1) * maxNotice;
  const totalPage = Math.ceil(totalNotice / maxNotice);

  if (currentPage > totalPage) {
    currentPage = totalPage;
  }

  const startPage = Math.floor((currentPage - 1) / maxPage) * maxPage + 1;
  let endPage = startPage + maxPage - 1;

  if (endPage > totalPage) {
    endPage = totalPage;
  }
  return { startPage, endPage, hideNotice, maxNotice, totalPage, currentPage };
}

export default paging;
