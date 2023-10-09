// import React, { FC, useMemo } from 'react'
// interface PaginationProps{
//     totalCount: number,
//     pageSize: number,
//     postCount: number,
//     currentPage: number,    
// }
// const Pagination:FC<PaginationProps> = ({totalCount,
//         pageSize,
//         postCount = 1,
//         currentPage}) => {
//         const paginationRange = useMemo(() => {
//           const totalPageCount = Math.ceil(totalCount / pageSize);
      
//           const totalPageNumbers = postCount + 5;
      
//           if (totalPageNumbers >= totalPageCount) {
//             return range(1, totalPageCount);
//           }
      
//           const leftpostIndex = Math.max(currentPage - postCount, 1);
//           const rightpostIndex = Math.min(
//             currentPage + postCount,
//             totalPageCount
//           );
      
//           const shouldShowLeftDots = leftpostIndex > 2;
//           const shouldShowRightDots = rightpostIndex < totalPageCount - 2;
      
//           const firstPageIndex = 1;
//           const lastPageIndex = totalPageCount;
      
//           if (!shouldShowLeftDots && shouldShowRightDots) {
//             let leftItemCount = 3 + 2 * postCount;
//             let leftRange = range(1, leftItemCount);
      
//             return [...leftRange, DOTS, totalPageCount];
//           }
            
//           if (shouldShowLeftDots && !shouldShowRightDots) {
      
//             let rightItemCount = 3 + 2 * postCount;
//             let rightRange = range(
//               totalPageCount - rightItemCount + 1,
//               totalPageCount
//             );
//             return [firstPageIndex, DOTS, ...rightRange];
//           }
//           if (shouldShowLeftDots && shouldShowRightDots) {
//             let middleRange = range(leftPostIndex, rightPostIndex);
//             return [firstPageIndex, DOTS, ...middleRange, DOTS, lastPageIndex];
//           }
//         }, [totalCount, pageSize, postCount, currentPage]);
      
//         return paginationRange;
//     }
      

// export default Pagination