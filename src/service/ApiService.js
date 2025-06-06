import axios from "axios";

export default class ApiService {
    static BASE_URL = "https://localhost:7031";

    static getHeader() {
        const token = localStorage.getItem("token");
        return {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
        };
    }

    /** AUTH & USERS API */
    static async registerUser(registration) {
        try {
            const response = await axios.post(`${this.BASE_URL}/api/v1/User/`, registration);
            return {
                status: response.status,
                data: response.data,
                message: "Registration successful"
            };
        } catch (error) {
            console.error("Registration error:", error);
            return {
                status: error.response?.status || 500,
                message: error.response?.data?.message || "Registration failed"
            };
        }
    }

    static async loginUser(loginDetails) {
        try {
            console.log("Sending login request with:", loginDetails);
            const response = await axios.post(`${this.BASE_URL}/api/v1/User/login`, loginDetails);

            console.log("Raw login response:", response);

            if (response && response.data && response.data.success) {
                localStorage.setItem("token", response.data.data.accessToken);
                // Fetch the actual user role and id
                const userInfoResponse = await this.getLoggedInUserInfo();
                if (userInfoResponse.status === 200 && userInfoResponse.data) {
                    localStorage.setItem("userRole", userInfoResponse.data.role || "USER");
                    localStorage.setItem("userId", userInfoResponse.data.id); // Ensure userId is stored
                } else {
                    console.error("Failed to fetch user role and id, defaulting to USER");
                    localStorage.setItem("userRole", "USER");
                    throw new Error("Failed to fetch user info");
                }
                return {
                    status: 200,
                    data: response.data.data
                };
            } else {
                return {
                    status: response.status || 400,
                    message: response.data.message || "Login failed"
                };
            }
        } catch (error) {
            console.error("Login request failed:", error);
            return {
                status: error.response?.status || 400,
                message: error.response?.data?.message || "Login failed"
            };
        }
    }

    static async getLoggedInUserInfo() {
        try {
            const response = await axios.get(`${this.BASE_URL}/api/v1/User/me`, { headers: this.getHeader() });
            if (response && response.data && response.data.data) {
                const roleId = response.data.data.role;
                const roleName = this.mapRoleIdToName(roleId);
                console.log("Fetched user info with id:", response.data.data.id); // Debug log
                localStorage.setItem("userRole", roleName);
            }
            return {
                status: response.status,
                data: response.data.data
            };
        } catch (error) {
            console.error("Failed to get user info:", error);
            return {
                status: error.response?.status || 500,
                message: error.response?.data?.message || "Failed to fetch user info"
            };
        }
    }

    /**
     * Log out a user
     * @param {Object} logoutData - Object containing the token
     * @returns {Promise<Object>} Response object with status and message
     */
    static async logoutUser(logoutData) {
        try {
            const response = await axios.post(
                `${this.BASE_URL}/api/v1/User/logout`,
                logoutData,
                { headers: this.getHeader() }
            );

            console.log("Logout response:", response.data);

            // Clear local storage after successful logout
            this.logout();

            return {
                status: 200,
                message: "Logout successful"
            };
        } catch (error) {
            console.error("Error during logout:", error);
            return {
                status: error.response?.status || 400,
                message: error.response?.data?.message || "Failed to logout"
            };
        }
    }

    /**
     * Send OTP to forget password for a user
     * @param {Object} forgetData - Object containing the email
     * @returns {Promise<Object>} Response object with status and message
     */
    static async forgetPassword(forgetData) {
        try {
            const response = await axios.post(
                `${this.BASE_URL}/api/v1/User/forget`,
                forgetData
            );

            console.log("Forget password response:", response.data);

            return {
                status: 200,
                message: "OTP sent successfully for password reset"
            };
        } catch (error) {
            console.error("Error during forget password:", error);
            return {
                status: error.response?.status || 400,
                message: error.response?.data?.message || "Failed to send OTP for password reset"
            };
        }
    }

    /**
     * Reset password for a user
     * @param {Object} resetData - Object containing OTP and newPassword
     * @returns {Promise<Object>} Response object with status and message
     */
    static async resetPassword(resetData) {
        try {
            const response = await axios.post(
                `${this.BASE_URL}/api/v1/User/reset`,
                resetData
            );

            console.log("Reset password response:", response.data);

            return {
                status: 200,
                message: "Password reset successful"
            };
        } catch (error) {
            console.error("Error during password reset:", error);
            return {
                status: error.response?.status || 400,
                message: error.response?.data?.message || "Failed to reset password"
            };
        }
    }

    /**
     * Refresh token for a user
     * @param {Object} refreshData - Object containing the token
     * @returns {Promise<Object>} Response object with status and data/message
     */
    static async refreshToken(refreshData) {
        try {
            const response = await axios.post(
                `${this.BASE_URL}/api/v1/User/refresh`,
                refreshData,
                { headers: this.getHeader() }
            );

            console.log("Refresh token response:", response.data);

            if (response && response.data) {
                localStorage.setItem("token", response.data.accessToken); // Update token in local storage
                return {
                    status: 200,
                    data: response.data,
                    message: "Token refreshed successfully"
                };
            } else {
                return {
                    status: 400,
                    message: "Invalid response format"
                };
            }
        } catch (error) {
            console.error("Error during token refresh:", error);
            return {
                status: error.response?.status || 400,
                message: error.response?.data?.message || "Failed to refresh token"
            };
        }
    }

    /**
     * Get a list of all users
     * @param {Object} params - Query parameters (pageSize, page, searchTerm, includeDeleted)
     * @returns {Promise<Object>} Response object with status and data/message
     */
    static async getAllUsers(params = {}) {
        try {
            const response = await axios.get(
                `${this.BASE_URL}/api/v1/User`,
                {
                    headers: this.getHeader(),
                    params: params
                }
            );

            console.log("Fetched users:", response.data);

            return {
                status: 200,
                data: response.data,
                message: "Users fetched successfully"
            };
        } catch (error) {
            console.error("Error fetching all users:", error);
            return {
                status: error.response?.status || 400,
                message: error.response?.data?.message || "Failed to fetch users"
            };
        }
    }

    /**
     * Get a user by ID
     * @param {string} userId - The ID of the user to fetch
     * @returns {Promise<Object>} Response object with status and data/message
     */
    static async getUserById(userId) {
        try {
            if (!userId) {
                throw new Error("User ID is required");
            }

            const response = await axios.get(
                `${this.BASE_URL}/api/v1/User/${userId}`,
                { headers: this.getHeader() }
            );

            console.log("Fetched user details:", response.data);

            return {
                status: 200,
                data: response.data,
                message: "User fetched successfully"
            };
        } catch (error) {
            console.error("Error fetching user details:", error);
            return {
                status: error.response?.status || 400,
                message: error.response?.data?.message || "Failed to fetch user details"
            };
        }
    }

    /**
     * Delete a user by ID
     * @param {string} userId - The ID of the user to delete
     * @returns {Promise<Object>} Response object with status and message
     */
    static async deleteUserById(userId) {
        try {
            if (!userId) {
                throw new Error("User ID is required for deletion");
            }

            const response = await axios.delete(
                `${this.BASE_URL}/api/v1/User/${userId}`,
                { headers: this.getHeader() }
            );

            console.log("Delete user response:", response.data);

            return {
                status: 200,
                message: "User deleted successfully"
            };
        } catch (error) {
            console.error("Error deleting user:", error);
            return {
                status: error.response?.status || 400,
                message: error.response?.data?.message || "Failed to delete user"
            };
        }
    }

    /**
     * Get a list of all blog posts
     * @param {Object} params - Query parameters (pageSize, page, searchTerm, includeDeleted, arrayobject)
     * @returns {Promise<Object>} Response object with status and data/message
     */
    static async getAllBlogPosts(params = {}) {
        try {
            const response = await axios.get(
                `${this.BASE_URL}/api/v1/BlogPost`,
                {
                    headers: this.getHeader(),
                    params: params
                }
            );

            console.log("Fetched all blog posts:", response.data);

            return {
                status: 200,
                data: response.data,
                message: "Blog posts fetched successfully"
            };
        } catch (error) {
            console.error("Error fetching all blog posts:", error);
            return {
                status: error.response?.status || 400,
                message: error.response?.data?.message || error.message || "Failed to fetch blog posts"
            };
        }
    }

    /**
     * Create a new blog post
     * @param {Object} blogData - The blog data containing title, content, and userId
     * @returns {Promise<Object>} Response object with status and data/message
     */
    static async createBlogPost(blogData) {
        try {
            if (!blogData.title || !blogData.content || !blogData.userId) {
                throw new Error("Blog title, content, and userId are required");
            }

            console.log("Creating new blog post with data:", blogData);

            const response = await axios.post(
                `${this.BASE_URL}/api/v1/BlogPost`,
                blogData,
                { headers: this.getHeader() }
            );

            console.log("Create blog post response:", response.data);

            return {
                status: 200,
                data: response.data,
                message: "Blog post created successfully"
            };
        } catch (error) {
            console.error("Error creating blog post:", error);
            return {
                status: error.response?.status || 400,
                message: error.response?.data?.message || error.message || "Failed to create blog post"
            };
        }
    }

    /**
     * Get a blog post by ID
     * @param {string} id - The ID of the blog post to fetch
     * @returns {Promise<Object>} Response object with status and data/message
     */
    static async getBlogPostById(id) {
        try {
            if (!id) {
                throw new Error("Blog post ID is required");
            }

            console.log("Fetching blog post with id:", id);

            const response = await axios.get(
                `${this.BASE_URL}/api/v1/BlogPost/${id}`,
                { headers: this.getHeader() }
            );

            console.log("Fetched blog post details:", response.data);

            return {
                status: 200,
                data: response.data,
                message: "Blog post fetched successfully"
            };
        } catch (error) {
            console.error("Error fetching blog post:", error);
            return {
                status: error.response?.status || 400,
                message: error.response?.data?.message || error.message || "Failed to fetch blog post"
            };
        }
    }

    /**
     * Update a blog post
     * @param {string} id - The ID of the blog post to update
     * @param {Object} blogData - The updated blog data containing title, content, and userId
     * @returns {Promise<Object>} Response object with status and data/message
     */
    static async updateBlogPost(id, blogData) {
        try {
            if (!id) {
                throw new Error("Blog post ID is required for update");
            }
            if (!blogData.title || !blogData.content || !blogData.userId) {
                throw new Error("Blog title, content, and userId are required");
            }

            console.log("Updating blog post with id:", id);
            console.log("Update data:", blogData);

            const response = await axios.put(
                `${this.BASE_URL}/api/v1/BlogPost`,
                blogData,
                { headers: this.getHeader() }
            );

            console.log("Update blog post response:", response.data);

            return {
                status: 200,
                data: response.data,
                message: "Blog post updated successfully"
            };
        } catch (error) {
            console.error("Error updating blog post:", error);
            return {
                status: error.response?.status || 400,
                message: error.response?.data?.message || error.message || "Failed to update blog post"
            };
        }
    }

    /**
     * Delete a blog post by ID
     * @param {string} id - The ID of the blog post to delete
     * @returns {Promise<Object>} Response object with status and message
     */
    static async deleteBlogPost(id) {
        try {
            if (!id) {
                throw new Error("Blog post ID is required for deletion");
            }

            console.log("Deleting blog post with id:", id);

            const response = await axios.delete(
                `${this.BASE_URL}/api/v1/BlogPost/${id}`,
                { headers: this.getHeader() }
            );

            console.log("Delete blog post response:", response.data);

            return {
                status: 200,
                message: "Blog post deleted successfully"
            };
        } catch (error) {
            console.error("Error deleting blog post:", error);
            return {
                status: error.response?.status || 400,
                message: error.response?.data?.message || error.message || "Failed to delete blog post"
            };
        }
    }

    /**
     * Get a list of all badges
     * @param {Object} params - Query parameters (pageSize, page, searchTerm, includeDeleted, arrayobject)
     * @returns {Promise<Object>} Response object with status and data/message
     */
    static async getAllBadges(params = {}) {
        try {
            const response = await axios.get(
                `${this.BASE_URL}/api/v1/Badge`,
                {
                    headers: this.getHeader(),
                    params: params
                }
            );

            console.log("Fetched all badges:", response.data);

            return {
                status: 200,
                data: response.data,
                message: "Badges fetched successfully"
            };
        } catch (error) {
            console.error("Error fetching all badges:", error);
            return {
                status: error.response?.status || 400,
                message: error.response?.data?.message || error.message || "Failed to fetch badges"
            };
        }
    }

    /**
     * Create a new badge
     * @param {Object} badgeData - The badge data containing name, description, area, and imageUrl
     * @returns {Promise<Object>} Response object with status and data/message
     */
    static async createBadge(badgeData) {
        try {
            if (!badgeData.name || !badgeData.description || !badgeData.area || !badgeData.imageUrl) {
                throw new Error("Badge name, description, area, and imageUrl are required");
            }

            console.log("Creating new badge with data:", badgeData);

            const response = await axios.post(
                `${this.BASE_URL}/api/v1/Badge`,
                badgeData,
                { headers: this.getHeader() }
            );

            console.log("Create badge response:", response.data);

            return {
                status: 200,
                data: response.data,
                message: "Badge created successfully"
            };
        } catch (error) {
            console.error("Error creating badge:", error);
            return {
                status: error.response?.status || 400,
                message: error.response?.data?.message || error.message || "Failed to create badge"
            };
        }
    }

    /**
     * Get a badge by ID
     * @param {string} badgeId - The ID of the badge to fetch
     * @returns {Promise<Object>} Response object with status and data/message
     */
    static async getBadgeById(badgeId) {
        try {
            if (!badgeId) {
                throw new Error("Badge ID is required");
            }

            console.log("Fetching badge with id:", badgeId);

            const response = await axios.get(
                `${this.BASE_URL}/api/v1/Badge/${badgeId}`,
                { headers: this.getHeader() }
            );

            console.log("Fetched badge details:", response.data);

            return {
                status: 200,
                data: response.data,
                message: "Badge fetched successfully"
            };
        } catch (error) {
            console.error("Errorsearching badge:", error);
            return {
                status: error.response?.status || 400,
                message: error.response?.data?.message || error.message || "Failed to fetch badge"
            };
        }
    }

    /**
     * Update a badge
     * @param {string} badgeId - The ID of the badge to update
     * @param {Object} badgeData - The updated badge data containing name, description, area, and imageUrl
     * @returns {Promise<Object>} Response object with status and data/message
     */
    static async updateBadge(badgeId, badgeData) {
        try {
            if (!badgeId) {
                throw new Error("Badge ID is required for update");
            }
            if (!badgeData.name || !badgeData.description || !badgeData.area || !badgeData.imageUrl) {
                throw new Error("Badge name, description, area, and imageUrl are required");
            }

            console.log("Updating badge with id:", badgeId);
            console.log("Update data:", badgeData);

            const response = await axios.put(
                `${this.BASE_URL}/api/v1/Badge`,
                { badgeId, ...badgeData },
                { headers: this.getHeader() }
            );

            console.log("Update badge response:", response.data);

            return {
                status: 200,
                data: response.data,
                message: "Badge updated successfully"
            };
        } catch (error) {
            console.error("Error updating badge:", error);
            return {
                status: error.response?.status || 400,
                message: error.response?.data?.message || error.message || "Failed to update badge"
            };
        }
    }

    /**
     * Delete a badge by ID
     * @param {string} badgeId - The ID of the badge to delete
     * @returns {Promise<Object>} Response object with status and message
     */
    static async deleteBadge(badgeId) {
        try {
            if (!badgeId) {
                throw new Error("Badge ID is required for deletion");
            }

            console.log("Deleting badge with id:", badgeId);

            const response = await axios.delete(
                `${this.BASE_URL}/api/v1/Badge/${badgeId}`,
                { headers: this.getHeader() }
            );

            console.log("Delete badge response:", response.data);

            return {
                status: 200,
                message: "Badge deleted successfully"
            };
        } catch (error) {
            console.error("Error deleting badge:", error);
            return {
                status: error.response?.status || 400,
                message: error.response?.data?.message || error.message || "Failed to delete badge"
            };
        }
    }

    /**
     * Get a list of all categories
     * @param {Object} params - Query parameters (pageSize, page, searchTerm, includeDeleted, arrayobject)
     * @returns {Promise<Object>} Response object with status and data/message
     */
    static async getAllCategories(params = {}) {
        try {
            const response = await axios.get(
                `${this.BASE_URL}/api/v1/Category?includeDeleted=false&Parameters=%7B%22order%22%3A0%2C%22parameterName%22%3A%22string%22%7D`,
                {
                    headers: this.getHeader(),
                    params: params
                }
            );

            console.log("Fetched all categories:", response.data);

            return {
                status: 200,
                data: response.data,
                message: "Categories fetched successfully"
            };
        } catch (error) {
            console.error("Error fetching all categories:", error);
            return {
                status: error.response?.status || 400,
                message: error.response?.data?.message || error.message || "Failed to fetch categories"
            };
        }
    }

    /**
     * Create a new category
     * @param {Object} categoryData - The category data containing name and description
     * @returns {Promise<Object>} Response object with status and data/message
     */
    static async createCategory(categoryData) {
        try {
            if (!categoryData.name || !categoryData.description) {
                throw new Error("Category name and description are required");
            }

            console.log("Creating new category with data:", categoryData);

            const response = await axios.post(
                `${this.BASE_URL}/api/v1/Category`,
                categoryData,
                { headers: this.getHeader() }
            );

            console.log("Create category response:", response.data);

            return {
                status: 200,
                data: response.data,
                message: "Category created successfully"
            };
        } catch (error) {
            console.error("Error creating category:", error);
            return {
                status: error.response?.status || 400,
                message: error.response?.data?.message || error.message || "Failed to create category"
            };
        }
    }

    /**
     * Get a category by ID
     * @param {string} categoryId - The ID of the category to fetch
     * @returns {Promise<Object>} Response object with status and data/message
     */
    static async getCategoryById(categoryId) {
        try {
            if (!categoryId) {
                throw new Error("Category ID is required");
            }

            console.log("Fetching category with id:", categoryId);

            const response = await axios.get(
                `${this.BASE_URL}/api/v1/Category/${categoryId}`,
                { headers: this.getHeader() }
            );

            console.log("Fetched category details:", response.data);

            return {
                status: 200,
                data: response.data,
                message: "Category fetched successfully"
            };
        } catch (error) {
            console.error("Error fetching category:", error);
            return {
                status: error.response?.status || 400,
                message: error.response?.data?.message || error.message || "Failed to fetch category"
            };
        }
    }

    /**
     * Update a category
     * @param {string} categoryId - The ID of the category to update
     * @param {Object} categoryData - The updated category data containing name and description
     * @returns {Promise<Object>} Response object with status and data/message
     */
    static async updateCategory(categoryId, categoryData) {
        try {
            if (!categoryId) {
                throw new Error("Category ID is required for update");
            }
            if (!categoryData.name || !categoryData.description) {
                throw new Error("Category name and description are required");
            }

            console.log("Updating category with id:", categoryId);
            console.log("Update data:", categoryData);

            const response = await axios.put(
                `${this.BASE_URL}/api/v1/Category`,
                { categoryId, ...categoryData },
                { headers: this.getHeader() }
            );

            console.log("Update category response:", response.data);

            return {
                status: 200,
                data: response.data,
                message: "Category updated successfully"
            };
        } catch (error) {
            console.error("Error updating category:", error);
            return {
                status: error.response?.status || 400,
                message: error.response?.data?.message || error.message || "Failed to update category"
            };
        }
    }

    /**
     * Delete a category by ID
     * @param {string} categoryId - The ID of the category to delete
     * @returns {Promise<Object>} Response object with status and message
     */
    static async deleteCategory(categoryId) {
        try {
            if (!categoryId) {
                throw new Error("Category ID is required for deletion");
            }

            console.log("Deleting category with id:", categoryId);

            const response = await axios.delete(
                `${this.BASE_URL}/api/v1/Category/${categoryId}`,
                { headers: this.getHeader() }
            );

            console.log("Delete category response:", response.data);

            return {
                status: 200,
                message: "Category deleted successfully"
            };
        } catch (error) {
            console.error("Error deleting category:", error);
            return {
                status: error.response?.status || 400,
                message: error.response?.data?.message || error.message || "Failed to delete category"
            };
        }
    }

    /**
     * Send ticket confirmation email
     * @param {Object} ticketData - Object containing ticket confirmation details
     * @returns {Promise<Object>} Response object with status and message
     */
    static async sendTicketConfirmationEmail(ticketData) {
        try {
            const response = await axios.post(
                `${this.BASE_URL}/api/v1/Mail/TicketConfirmation`,
                ticketData,
                { headers: this.getHeader() }
            );

            console.log("Ticket confirmation email response:", response.data);

            return {
                status: 200,
                message: "Ticket confirmation email sent successfully"
            };
        } catch (error) {
            console.error("Error sending ticket confirmation email:", error);
            return {
                status: error.response?.status || 400,
                message: error.response?.data?.message || "Failed to send ticket confirmation email"
            };
        }
    }

    /**
     * Send subscription email
     * @param {Object} subscriptionData - Object containing subscription details
     * @returns {Promise<Object>} Response object with status and message
     */
    static async sendSubscriptionEmail(subscriptionData) {
        try {
            const response = await axios.post(
                `${this.BASE_URL}/api/v1/Mail/Subscription`,
                subscriptionData,
                { headers: this.getHeader() }
            );

            console.log("Subscription email response:", response.data);

            return {
                status: 200,
                message: "Subscription email sent successfully"
            };
        } catch (error) {
            console.error("Error sending subscription email:", error);
            return {
                status: error.response?.status || 400,
                message: error.response?.data?.message || "Failed to send subscription email"
            };
        }
    }

    /**
     * Send OTP email
     * @param {Object} otpData - Object containing OTP details
     * @returns {Promise<Object>} Response object with status and message
     */
    static async sendOtpEmail(otpData) {
        try {
            const response = await axios.post(
                `${this.BASE_URL}/api/v1/Mail/Otp`,
                otpData,
                { headers: this.getHeader() }
            );

            console.log("OTP email response:", response.data);

            return {
                status: 200,
                message: "OTP email sent successfully"
            };
        } catch (error) {
            console.error("Error sending OTP email:", error);
            return {
                status: error.response?.status || 400,
                message: error.response?.data?.message || "Failed to send OTP email"
            };
        }
    }

    /**
     * Send newsletter email
     * @param {Object} newsletterData - Object containing newsletter details
     * @returns {Promise<Object>} Response object with status and message
     */
    static async sendNewsletterEmail(newsletterData) {
        try {
            const response = await axios.post(
                `${this.BASE_URL}/api/v1/Mail/Newsletter`,
                newsletterData,
                { headers: this.getHeader() }
            );

            console.log("Newsletter email response:", response.data);

            return {
                status: 200,
                message: "Newsletter email sent successfully"
            };
        } catch (error) {
            console.error("Error sending newsletter email:", error);
            return {
                status: error.response?.status || 400,
                message: error.response?.data?.message || "Failed to send newsletter email"
            };
        }
    }

    /**
     * Get a list of all reviews
     * @param {Object} params - Query parameters (pageSize, page, searchTerm, includeDeleted, arrayobject)
     * @returns {Promise<Object>} Response object with status and data/message
     */
    static async getAllReviews(params = {}) {
        try {
            const response = await axios.get(
                `${this.BASE_URL}/api/v1/Review`,
                {
                    headers: this.getHeader(),
                    params: params
                }
            );

            console.log("Fetched all reviews:", response.data);

            return {
                status: 200,
                data: response.data,
                message: "Reviews fetched successfully"
            };
        } catch (error) {
            console.error("Error fetching all reviews:", error);
            return {
                status: error.response?.status || 400,
                message: error.response?.data?.message || error.message || "Failed to fetch reviews"
            };
        }
    }

    /**
     * Create a new review
     * @param {Object} reviewData - The review data containing userId, workshopId, rating, and comment
     * @returns {Promise<Object>} Response object with status and data/message
     */
    static async createReview(reviewData) {
        try {
            if (!reviewData.userId || !reviewData.workshopId || !reviewData.rating || !reviewData.comment) {
                throw new Error("User ID, Workshop ID, rating, and comment are required");
            }

            console.log("Creating new review with data:", reviewData);

            const response = await axios.post(
                `${this.BASE_URL}/api/v1/Review`,
                reviewData,
                { headers: this.getHeader() }
            );

            console.log("Create review response:", response.data);

            return {
                status: 200,
                data: response.data,
                message: "Review created successfully"
            };
        } catch (error) {
            console.error("Error creating review:", error);
            return {
                status: error.response?.status || 400,
                message: error.response?.data?.message || error.message || "Failed to create review"
            };
        }
    }

    /**
     * Get a review by ID
     * @param {string} reviewId - The ID of the review to fetch
     * @returns {Promise<Object>} Response object with status and data/message
     */
    static async getReviewById(reviewId) {
        try {
            if (!reviewId) {
                throw new Error("Review ID is required");
            }

            console.log("Fetching review with id:", reviewId);

            const response = await axios.get(
                `${this.BASE_URL}/api/v1/Review/${reviewId}`,
                { headers: this.getHeader() }
            );

            console.log("Fetched review details:", response.data);

            return {
                status: 200,
                data: response.data,
                message: "Review fetched successfully"
            };
        } catch (error) {
            console.error("Error fetching review:", error);
            return {
                status: error.response?.status || 400,
                message: error.response?.data?.message || error.message || "Failed to fetch review"
            };
        }
    }

    /**
     * Update a review
     * @param {string} reviewId - The ID of the review to update
     * @param {Object} reviewData - The updated review data containing userId, workshopId, rating, and comment
     * @returns {Promise<Object>} Response object with status and data/message
     */
    static async updateReview(reviewId, reviewData) {
        try {
            if (!reviewId) {
                throw new Error("Review ID is required for update");
            }
            if (!reviewData.userId || !reviewData.workshopId || !reviewData.rating || !reviewData.comment) {
                throw new Error("User ID, Workshop ID, rating, and comment are required");
            }

            console.log("Updating review with id:", reviewId);
            console.log("Update data:", reviewData);

            const response = await axios.put(
                `${this.BASE_URL}/api/v1/Review`,
                { reviewId, ...reviewData },
                { headers: this.getHeader() }
            );

            console.log("Update review response:", response.data);

            return {
                status: 200,
                data: response.data,
                message: "Review updated successfully"
            };
        } catch (error) {
            console.error("Error updating review:", error);
            return {
                status: error.response?.status || 400,
                message: error.response?.data?.message || error.message || "Failed to update review"
            };
        }
    }

    /**
     * Delete a review by ID
     * @param {string} reviewId - The ID of the review to delete
     * @returns {Promise<Object>} Response object with status and message
     */
    static async deleteReview(reviewId) {
        try {
            if (!reviewId) {
                throw new Error("Review ID is required for deletion");
            }

            console.log("Deleting review with id:", reviewId);

            const response = await axios.delete(
                `${this.BASE_URL}/api/v1/Review/${reviewId}`,
                { headers: this.getHeader() }
            );

            console.log("Delete review response:", response.data);

            return {
                status: 200,
                message: "Review deleted successfully"
            };
        } catch (error) {
            console.error("Error deleting review:", error);
            return {
                status: error.response?.status || 400,
                message: error.response?.data?.message || error.message || "Failed to delete review"
            };
        }
    }

    /**
     * Get a list of workshop tickets for the customer
     * @returns {Promise<Object>} Response object with status and data/message
     */
    static async getWorkshopTickets() {
        try {
            const response = await axios.get(
                `${this.BASE_URL}/api/v1/Workshop/WorkshopTicket`,
                { headers: this.getHeader() }
            );

            console.log("Fetched workshop tickets:", response.data);

            return {
                status: 200,
                data: response.data,
                message: "Workshop tickets fetched successfully"
            };
        } catch (error) {
            console.error("Error fetching workshop tickets:", error);
            return {
                status: error.response?.status || 400,
                message: error.response?.data?.message || error.message || "Failed to fetch workshop tickets"
            };
        }
    }

    /**
     * Get a list of all workshops
     * @param {Object} params - Query parameters (pageSize, page, searchTerm, includeDeleted, arrayobject)
     * @returns {Promise<Object>} Response object with status and data/message
     */
    static async getAllWorkshops(params = {}) {
        try {
            const response = await axios.get(
                `${this.BASE_URL}/api/v1/Workshop`,
                {
                    headers: this.getHeader(),
                    params: params
                }
            );

            console.log("Fetched all workshops:", response.data);

            return {
                status: 200,
                data: response.data,
                message: "Workshops fetched successfully"
            };
        } catch (error) {
            console.error("Error fetching all workshops:", error);
            return {
                status: error.response?.status || 400,
                message: error.response?.data?.message || error.message || "Failed to fetch workshops"
            };
        }
    }

    /**
     * Create a new workshop
     * @param {Object} workshopData - The workshop data containing name, description, startDate, endDate, location, capacity, price, organizerId, categoryId
     * @returns {Promise<Object>} Response object with status and data/message
     */
    static async createWorkshop(workshopData) {
        try {
            if (!workshopData.name || !workshopData.description || !workshopData.startDate ||
                !workshopData.endDate || !workshopData.location || !workshopData.capacity ||
                workshopData.price === undefined || !workshopData.organizerId || !workshopData.categoryId) {
                throw new Error("Name, description, startDate, endDate, location, capacity, price, organizerId, and categoryId are required");
            }

            console.log("Creating new workshop with data:", workshopData);

            const response = await axios.post(
                `${this.BASE_URL}/api/v1/Workshop`,
                workshopData,
                { headers: this.getHeader() }
            );

            console.log("Create workshop response:", response.data);

            return {
                status: 200,
                data: response.data,
                message: "Workshop created successfully"
            };
        } catch (error) {
            console.error("Error creating workshop:", error);
            return {
                status: error.response?.status || 400,
                message: error.response?.data?.message || error.message || "Failed to create workshop"
            };
        }
    }

    /**
     * Get a workshop by ID
     * @param {string} workshopId - The ID of the workshop to fetch
     * @returns {Promise<Object>} Response object with status and data/message
     */
    static async getWorkshopById(workshopId) {
        try {
            if (!workshopId) {
                throw new Error("Workshop ID is required");
            }

            console.log("Fetching workshop with id:", workshopId);

            const response = await axios.get(
                `${this.BASE_URL}/api/v1/Workshop/${workshopId}`,
                { headers: this.getHeader() }
            );

            console.log("Fetched workshop details:", response.data);

            return {
                status: 200,
                data: response.data,
                message: "Workshop fetched successfully"
            };
        } catch (error) {
            console.error("Error fetching workshop:", error);
            return {
                status: error.response?.status || 400,
                message: error.response?.data?.message || error.message || "Failed to fetch workshop"
            };
        }
    }

    /**
     * Update a workshop
     * @param {string} workshopId - The ID of the workshop to update
     * @param {Object} workshopData - The updated workshop data containing name, description, startDate, endDate, location, capacity, price, organizerId, categoryId
     * @returns {Promise<Object>} Response object with status and data/message
     */
    static async updateWorkshop(workshopId, workshopData) {
        try {
            if (!workshopId) {
                throw new Error("Workshop ID is required for update");
            }
            if (!workshopData.name || !workshopData.description || !workshopData.startDate ||
                !workshopData.endDate || !workshopData.location || !workshopData.capacity ||
                workshopData.price === undefined || !workshopData.organizerId || !workshopData.categoryId) {
                throw new Error("Name, description, startDate, endDate, location, capacity, price, organizerId, and categoryId are required");
            }

            console.log("Updating workshop with id:", workshopId);
            console.log("Update data:", workshopData);

            const response = await axios.put(
                `${this.BASE_URL}/api/v1/Workshop`,
                { workshopId, ...workshopData },
                { headers: this.getHeader() }
            );

            console.log("Update workshop response:", response.data);

            return {
                status: 200,
                data: response.data,
                message: "Workshop updated successfully"
            };
        } catch (error) {
            console.error("Error updating workshop:", error);
            return {
                status: error.response?.status || 400,
                message: error.response?.data?.message || error.message || "Failed to update workshop"
            };
        }
    }

    /**
     * Delete a workshop by ID
     * @param {string} workshopId - The ID of the workshop to delete
     * @returns {Promise<Object>} Response object with status and message
     */
    static async deleteWorkshop(workshopId) {
        try {
            if (!workshopId) {
                throw new Error("Workshop ID is required for deletion");
            }

            console.log("Deleting workshop with id:", workshopId);

            const response = await axios.delete(
                `${this.BASE_URL}/api/v1/Workshop/${workshopId}`,
                { headers: this.getHeader() }
            );

            console.log("Delete workshop response:", response.data);

            return {
                status: 200,
                message: "Workshop deleted successfully"
            };
        } catch (error) {
            console.error("Error deleting workshop:", error);
            return {
                status: error.response?.status || 400,
                message: error.response?.data?.message || error.message || "Failed to delete workshop"
            };
        }
    }

    /**
     * Get a list of all workshops for the organizer
     * @param {Object} params - Query parameters (pageSize, page, searchTerm, includeDeleted, arrayobject)
     * @returns {Promise<Object>} Response object with status and data/message
     */
    static async getWorkshopsForOrganizer(params = {}) {
        try {
            const response = await axios.get(
                `${this.BASE_URL}/api/v1/Workshop/organizer`,
                {
                    headers: this.getHeader(),
                    params: params
                }
            );

            console.log("Fetched workshops for organizer:", response.data);

            return {
                status: 200,
                data: response.data,
                message: "Workshops for organizer fetched successfully"
            };
        } catch (error) {
            console.error("Error fetching workshops for organizer:", error);
            return {
                status: error.response?.status || 400,
                message: error.response?.data?.message || error.message || "Failed to fetch workshops for organizer"
            };
        }
    }

    /**
     * Get a list of all pending workshops for the admin
     * @param {Object} params - Query parameters (pageSize, page, searchTerm, includeDeleted, arrayobject)
     * @returns {Promise<Object>} Response object with status and data/message
     */
    static async getPendingWorkshopsForAdmin(params = {}) {
        try {
            const response = await axios.get(
                `${this.BASE_URL}/api/v1/Workshop/admin/pending`,
                {
                    headers: this.getHeader(),
                    params: params
                }
            );

            console.log("Fetched pending workshops for admin:", response.data);

            return {
                status: 200,
                data: response.data,
                message: "Pending workshops for admin fetched successfully"
            };
        } catch (error) {
            console.error("Error fetching pending workshops for admin:", error);
            return {
                status: error.response?.status || 400,
                message: error.response?.data?.message || error.message || "Failed to fetch pending workshops for admin"
            };
        }
    }

    /**
     * Approve a workshop by ID
     * @param {string} workshopId - The ID of the workshop to approve
     * @returns {Promise<Object>} Response object with status and message
     */
    static async approveWorkshop(workshopId) {
        try {
            if (!workshopId) {
                throw new Error("Workshop ID is required for approval");
            }

            console.log("Approving workshop with id:", workshopId);

            const response = await axios.put(
                `${this.BASE_URL}/api/v1/Workshop/admin/${workshopId}/approve`,
                {},
                { headers: this.getHeader() }
            );

            console.log("Approve workshop response:", response.data);

            return {
                status: 200,
                message: "Workshop approved successfully"
            };
        } catch (error) {
            console.error("Error approving workshop:", error);
            return {
                status: error.response?.status || 400,
                message: error.response?.data?.message || error.message || "Failed to approve workshop"
            };
        }
    }

    /**
     * Get statistics for admin
     * @returns {Promise<Object>} Response object with status and data/message
     */
    static async getAdminStatistics() {
        try {
            const response = await axios.get(
                `${this.BASE_URL}/api/v1/Statistic/admin`,
                { headers: this.getHeader() }
            );

            console.log("Fetched admin statistics:", response.data);

            return {
                status: 200,
                data: response.data,
                message: "Admin statistics fetched successfully"
            };
        } catch (error) {
            console.error("Error fetching admin statistics:", error);
            return {
                status: error.response?.status || 400,
                message: error.response?.data?.message || error.message || "Failed to fetch admin statistics"
            };
        }
    }

    /**
     * Get statistics for organizer
     * @returns {Promise<Object>} Response object with status and data/message
     */
    static async getOrganizerStatistics() {
        try {
            const response = await axios.get(
                `${this.BASE_URL}/api/v1/Statistic/organizer`,
                { headers: this.getHeader() }
            );

            console.log("Fetched organizer statistics:", response.data);

            return {
                status: 200,
                data: response.data,
                message: "Organizer statistics fetched successfully"
            };
        } catch (error) {
            console.error("Error fetching organizer statistics:", error);
            return {
                status: error.response?.status || 400,
                message: error.response?.data?.message || error.message || "Failed to fetch organizer statistics"
            };
        }
    }

    /**
     * Create a booking for a workshop
     * @param {Object} bookingData - The booking data containing userId, workshopId, and quantity
     * @returns {Promise<Object>} Response object with status and data/message
     */
    static async createBooking(bookingData) {
        try {
            if (!bookingData.userId || !bookingData.workshopId || !bookingData.quantity) {
                throw new Error("User ID, Workshop ID, and quantity are required");
            }

            console.log("Creating new booking with data:", bookingData);

            const response = await axios.post(
                `${this.BASE_URL}/api/v1/Booking`,
                bookingData,
                { headers: this.getHeader() }
            );

            console.log("Create booking response:", response.data);

            return {
                status: 200,
                data: response.data,
                message: "Booking created successfully"
            };
        } catch (error) {
            console.error("Error creating booking:", error);
            return {
                status: error.response?.status || 400,
                message: error.response?.data?.message || error.message || "Failed to create booking"
            };
        }
    }

    /**
     * Create a payment
     * @param {Object} paymentData - The payment data containing bookingId, amount, and paymentMethod
     * @returns {Promise<Object>} Response object with status and data/message
     */
    static async createPayment(paymentData) {
        try {
            if (!paymentData.bookingId || paymentData.amount === undefined || !paymentData.paymentMethod) {
                throw new Error("Booking ID, amount, and payment method are required");
            }

            console.log("Creating new payment with data:", paymentData);

            const response = await axios.post(
                `${this.BASE_URL}/api/v1/Payment`,
                paymentData,
                { headers: this.getHeader() }
            );

            console.log("Create payment response:", response.data);

            return {
                status: 200,
                data: response.data,
                message: "Payment created successfully"
            };
        } catch (error) {
            console.error("Error creating payment:", error);
            return {
                status: error.response?.status || 400,
                message: error.response?.data?.message || error.message || "Failed to create payment"
            };
        }
    }

    static getUserRole() {
        return localStorage.getItem("userRole");
    }

    static mapRoleIdToName(roleId) {
        switch (roleId) {
            case 0: return 'ADMIN';
            case 1: return 'ORGANIZER';
            case 2: return 'USER';
            default: return 'USER';
        }
    }

    static isAuthenticated() {
        return !!localStorage.getItem("token");
    }

    static isAdmin() {
        const role = this.getUserRole();
        console.log("Checking if admin. Current role:", role);
        return role === 'ADMIN';
    }

    static isOrganizer() {
        return this.getUserRole() === 'ORGANIZER';
    }

    static isUser() {
        return this.getUserRole() === 'USER';
    }

    static logout() {
        localStorage.removeItem("token");
        localStorage.removeItem("userRole");
    }
}