import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteBooking as deleteBookingAPI } from '../../services/apiBookings';
import toast from 'react-hot-toast';

export function useDeleteBooking() {
    const queryClient = useQueryClient();

    const { mutate: deleteBooking, isLoading: isDeleting } = useMutation({
        mutationFn: bookingId => deleteBookingAPI(bookingId),

        onSuccess: () => {
            toast.success(`The booking has been successfully deleted!`);
            queryClient.invalidateQueries({ active: true });
        },

        onError: () =>
            toast.error('There was an error while deleting the booking'),
    });

    return { deleteBooking, isDeleting };
}
