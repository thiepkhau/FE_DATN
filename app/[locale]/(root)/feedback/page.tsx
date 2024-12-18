'use client';

import {ChevronFirst, ChevronLast, ChevronLeft, ChevronRight} from 'lucide-react';
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from '@/components/ui/table';
import {Button} from '@/components/ui/button';
import PageContainer from '@/app/components/page-container';
import {useState} from 'react';
import {useQuery} from '@tanstack/react-query';
import {getAllReview} from '@/app/api/review/getAllReview';
import {useTranslation} from 'react-i18next';
import {FaStar} from 'react-icons/fa'

export default function Feedback() {
    // Lấy dữ liệu đánh giá từ API
    const {data: allReviewData} = useQuery<any>({
        queryKey: ['dataReviews'],
        queryFn: getAllReview,
    });

    // Dữ liệu đánh giá và phân trang
    const reviews = allReviewData?.payload || [];
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10; // Số item mỗi trang
    const totalPages = Math.ceil(reviews.length / itemsPerPage);
    const {t} = useTranslation('common');


    // Lấy danh sách đánh giá cho trang hiện tại
    const getCurrentPageItems = () => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        return reviews.slice(startIndex, endIndex);
    };

    // Chuyển đổi trang
    const goToFirstPage = () => setCurrentPage(1);
    const goToLastPage = () => setCurrentPage(totalPages);
    const goToNextPage = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));
    const goToPreviousPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));

    // Hàm định dạng giá tiền
    const formatPrice = (price: number) =>
        price.toLocaleString('vi-VN', {minimumFractionDigits: 0, maximumFractionDigits: 0});

    return (
        <div className='h-full bg-gray-900 py-40 text-white'>
            <h2 className='text-center text-lg font-semibold'>{t('Reviews & Feedbacks')}</h2>
            <PageContainer>
                <div className='w-full px-20'>
                    <Table
                        className='w-full border-collapse border border-gray-700 rounded-lg overflow-hidden shadow-lg'>
                        <TableHeader>
                            <TableRow className='text-white'>
                                <TableHead className='px-4 py-3 text-left font-semibold uppercase'>
                                    {t('Staff Comment')}
                                </TableHead>
                                <TableHead className='px-4 py-3 text-left font-semibold uppercase'>
                                    {t('Staff Rating')}
                                </TableHead>
                                <TableHead className='px-4 py-3 text-left font-semibold uppercase'>{t('Service')}</TableHead>
                                <TableHead className='px-4 py-3 text-left font-semibold uppercase'>{t('Combo')}</TableHead>
                                <TableHead className='px-4 py-3 text-left font-semibold uppercase'>{t('Comment')}</TableHead>
                                <TableHead className='px-4 py-3 text-left font-semibold uppercase'>{t('Rating')}</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {getCurrentPageItems().map((review: any, index: number) => (
                                <TableRow
                                    key={index}
                                    className={`${
                                        index % 2 === 0 ? 'bg-gray-800' : 'bg-gray-700'
                                    } hover:bg-gray-600 transition-all`}
                                >
                                    {/* Cột Staff Comment */}
                                    <TableCell className='px-4 py-3'>{review.staffComment || 'N/A'}</TableCell>

                                    {/* Cột Staff Rating */}
                                    <TableCell className='px-4 py-3 text-center'>
                                        <TableCell
                                            className='px-4 py-3 text-center flex items-center justify-center'> {review.staffRating ? (
                                            <span className='flex items-center'> {review.staffRating} <FaStar
                                                className='text-yellow-500 ml-1'/> </span>) : ('N/A')} </TableCell>
                                    </TableCell>

                                    {/* Cột Service */}
                                    <TableCell className='px-4 py-3'>
                                        {review.reviewDetails
                                            .filter((detail: any) => detail.bookingDetail.service)
                                            .map((detail: any) => (
                                                <div key={detail.id} className='text-sm mb-1'>
                                                    <span>{detail.bookingDetail.service.name}</span> -{' '}
                                                    <span>{formatPrice(detail.bookingDetail.service.price)} đ</span>
                                                </div>
                                            ))}
                                    </TableCell>

                                    {/* Cột Combo */}
                                    <TableCell className='px-4 py-3'>
                                        {review.reviewDetails
                                            .filter((detail: any) => detail.bookingDetail.combo)
                                            .map((detail: any) => (
                                                <div key={detail.id} className='text-sm mb-1'>
                                                    <span>{detail.bookingDetail.combo.name}</span> -{' '}
                                                    <span>{formatPrice(detail.bookingDetail.combo.price)} đ</span>
                                                </div>
                                            ))}
                                    </TableCell>

                                    {/* Cột Comment */}
                                    <TableCell className='px-4 py-3'>
                                        {review.reviewDetails[0]?.comment || 'N/A'}
                                    </TableCell>

                                    {/* Cột Rating */}
                                    <TableCell className='px-4 py-3 text-center'> {review.reviewDetails[0]?.rating ? (
                                        <span
                                            className='flex items-center justify-center'> {review.reviewDetails[0].rating}
                                            <FaStar className='text-yellow-500 ml-1'/> </span>) : ('N/A')} </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>

                    {/* Phân trang */}
                    <div className='flex justify-between items-center container-lg'>
                        <Button
                            variant='outline'
                            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                            disabled={currentPage === 1}
                            className='bg-white text-black'
                        >
                            <ChevronLeft className='w-4 h-4 mr-2'/>
                            {t('Previous')}
                        </Button>
                        <span className='text-sm text-white'>
					{t('Page')} {currentPage} {t('of')} {totalPages}
				</span>
                        <Button
                            variant='outline'
                            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                            disabled={currentPage === totalPages}
                            className='bg-white text-black'
                        >
                            {t('Next')}
                            <ChevronRight className='w-4 h-4 ml-2'/>
                        </Button>
                    </div>
                </div>
            </PageContainer>
        </div>
    );
}
