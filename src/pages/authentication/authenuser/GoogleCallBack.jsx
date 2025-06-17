import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import ApiService from '../../../service/ApiService';
import Swal from 'sweetalert2';

const GoogleCallback = () => {
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const code = params.get('code');

        if (code) {
            const login = async () => {
                try {
                    const redirectUri = window.location.origin + '/login';
                    const response = await ApiService.loginWithGoogle({ code, redirectUri });

                    if (response.status === 200) {
                        const userInfo = await ApiService.getLoggedInUserInfo();
                        localStorage.setItem('userId', userInfo.data.id);
                        localStorage.setItem('userRole', userInfo.data.role);

                        await Swal.fire('Thành công', 'Đăng nhập bằng Google thành công!', 'success');

                        switch (userInfo.data.role) {
                            case 'ADMIN':
                                navigate('/admindashboard');
                                break;
                            case 'ORGANIZER':
                                navigate('/organizerdashboard');
                                break;
                            default:
                                navigate('/');
                        }
                    } else {
                        Swal.fire('Lỗi', response.message || 'Google login failed', 'error');
                    }
                } catch (err) {
                    console.error(err);
                    Swal.fire('Lỗi', 'Không thể đăng nhập với Google', 'error');
                }
            };

            login();
        }
    }, [location, navigate]);

    return <div className="text-center text-gray-600 mt-20">Đang xử lý đăng nhập với Google...</div>;
};

export default GoogleCallback;
