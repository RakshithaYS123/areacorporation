<template>
    <div class="dashboard-container">
        <h1 class="dashboard-title">User Dashboard</h1>

        <!-- Report New Issue Card -->
        <div class="card p-4 mb-5 issue-card">
            <h3 class="mb-3 section-heading">Report a New Area Issue</h3>
            <div v-if="submitError" class="alert alert-danger">{{ submitError }}</div>
            <div v-if="submitSuccess" class="alert alert-success">
                <i class="fas fa-check-circle mr-2"></i> Your issue has been reported successfully!
            </div>

            <form @submit.prevent="handleSubmitIssue">
                <div class="form-group mb-3">
                    <label class="form-label">Address of the Issue:</label>
                    <input type="text" v-model="newIssue.address" class="form-control"
                        placeholder="Enter the location address" required />
                </div>

                <div class="form-group mb-3">
                    <label class="form-label">Description of the Issue:</label>
                    <textarea v-model="newIssue.description" class="form-control"
                        placeholder="Describe the issue in detail" rows="4" required></textarea>
                </div>

                <div class="form-group mb-4">
                    <label class="form-label">Image of the Issue:</label>
                    <div class="custom-file-container">
                        <input type="file" ref="imageInput" @change="handleImageChange" accept="image/*"
                            class="form-control" id="issue-image" />
                        <small class="text-muted d-block mt-1">
                            <i class="fas fa-info-circle"></i> Upload an image of the issue (Max size: 10MB)
                        </small>
                    </div>

                    <div v-if="imagePreview" class="mt-3 image-preview-container">
                        <img :src="imagePreview" alt="Issue Image" class="img-thumbnail" />
                        <button type="button" class="btn btn-sm btn-danger remove-image-btn" @click="removeImage">
                            <i class="fas fa-times"></i>
                        </button>
                    </div>
                </div>

                <button type="submit" class="btn btn-primary btn-lg" :disabled="submitting">
                    <i class="fas fa-paper-plane mr-2"></i> {{ submitting ? 'Submitting...' : 'Submit Issue' }}
                </button>
            </form>
        </div>

        <!-- Issues List Card -->
        <div class="card p-4 issues-card">
            <h3 class="mb-3 section-heading">Your Reported Issues</h3>

            <div v-if="loading" class="text-center py-4">
                <div class="spinner-border text-primary" role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>
                <p class="mt-2">Loading your issues...</p>
            </div>

            <div v-else-if="issues.length === 0" class="empty-state py-5 text-center">
                <i class="fas fa-clipboard-list empty-icon mb-3"></i>
                <p>You haven't reported any issues yet.</p>
            </div>

            <div v-else class="table-responsive">
                <table class="table table-hover">
                    <thead class="table-light">
                        <tr>
                            <th>Address</th>
                            <th>Description</th>
                            <th>Status</th>
                            <th>Reported On</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="issue in issues" :key="issue._id">
                            <td>{{ issue.address }}</td>
                            <td>{{ issue.description }}</td>
                            <td>
                                <span :class="getStatusBadgeClass(issue.status)" class="status-badge">
                                    {{ getStatusLabel(issue.status) }}
                                </span>
                            </td>
                            <td>{{ formatDate(issue.createdAt) }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
    name: 'UserDashboard',
    data() {
        return {
            newIssue: {
                address: '',
                description: '',
                image: null
            },
            imagePreview: null,
            submitting: false,
            submitError: '',
            submitSuccess: false,
            loading: false
        };
    },
    computed: {
        ...mapGetters(['issues'])
    },
    methods: {
        ...mapActions(['createIssue', 'getUserIssues']),

        handleImageChange(e) {
            const file = e.target.files[0];
            if (!file) return;

            // Validate file size (max 10MB)
            if (file.size > 10 * 1024 * 1024) {
                this.submitError = 'Image size exceeds 10MB limit';
                this.$refs.imageInput.value = '';
                return;
            }

            this.newIssue.image = file;

            const reader = new FileReader();
            reader.onload = (e) => {
                this.imagePreview = e.target.result;
            };
            reader.readAsDataURL(file);
        },

        removeImage() {
            this.imagePreview = null;
            this.newIssue.image = null;
            this.$refs.imageInput.value = '';
        },

        async handleSubmitIssue() {
            this.submitting = true;
            this.submitError = '';
            this.submitSuccess = false;

            try {
                const result = await this.createIssue(this.newIssue);

                if (result.success) {
                    this.newIssue = { address: '', description: '', image: null };
                    this.imagePreview = null;
                    this.$refs.imageInput.value = '';

                    this.submitSuccess = true;
                    this.fetchUserIssues();

                    // Scroll to top to show success message
                    window.scrollTo({ top: 0, behavior: 'smooth' });

                    // Auto-hide success message after 5 seconds
                    setTimeout(() => {
                        this.submitSuccess = false;
                    }, 5000);
                } else {
                    this.submitError = result.error;
                }
            } catch (err) {
                this.submitError = 'An error occurred while submitting the issue';
                console.error(err);
            } finally {
                this.submitting = false;
            }
        },

        async fetchUserIssues() {
            this.loading = true;

            try {
                await this.getUserIssues();
            } catch (err) {
                console.error('Failed to fetch issues:', err);
            } finally {
                this.loading = false;
            }
        },

        getStatusBadgeClass(status) {
            // Fixed status badge styling
            const baseClass = 'badge rounded-pill';
            const statusClasses = {
                'pending': `${baseClass} bg-warning text-dark`,
                'in-progress': `${baseClass} bg-primary text-white`,
                'resolved': `${baseClass} bg-success text-white`,
                'rejected': `${baseClass} bg-danger text-white`,
                'under-review': `${baseClass} bg-info text-white`
            };
            return statusClasses[status] || `${baseClass} bg-secondary text-white`;
        },

        getStatusLabel(status) {
            return {
                'pending': 'Pending',
                'in-progress': 'In Progress',
                'resolved': 'Resolved',
                'rejected': 'Rejected',
                'under-review': 'Under Review'
            }[status] || status.charAt(0).toUpperCase() + status.slice(1);
        },

        formatDate(dateString) {
            const options = {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            };
            return new Date(dateString).toLocaleDateString(undefined, options);
        }
    },
    created() {
        this.fetchUserIssues();
    }
};
</script>

<style scoped>
.dashboard-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
}

.dashboard-title {
    font-size: 2rem;
    font-weight: 700;
    color: #333;
    margin-bottom: 1.5rem;
    border-bottom: 2px solid #4113c1;
    padding-bottom: 10px;
}

.section-heading {
    color: #4113c1;
    font-weight: 600;
}

.issue-card,
.issues-card {
    border-radius: 12px;
    box-shadow: 0 0 20px rgba(65, 19, 193, 0.2);
    border: none;
    transition: all 0.3s ease;
}

.issue-card:hover {
    box-shadow: 0 0 25px rgba(65, 19, 193, 0.3);
}

.form-label {
    font-weight: 500;
    color: #555;
}

.form-control:focus {
    border-color: #4113c1;
    box-shadow: 0 0 0 0.2rem rgba(65, 19, 193, 0.25);
}

.btn-primary {
    background-color: #4113c1;
    border-color: #4113c1;
    transition: all 0.3s ease;
}

.btn-primary:hover,
.btn-primary:focus {
    background-color: #350fa3;
    border-color: #350fa3;
}

.image-preview-container {
    position: relative;
    display: inline-block;
}

.image-preview-container img {
    max-width: 200px;
    max-height: 200px;
    object-fit: cover;
    border: 2px solid #4113c1;
}

.remove-image-btn {
    position: absolute;
    top: -10px;
    right: -10px;
    border-radius: 50%;
    padding: 0.25rem 0.5rem;
}

.empty-state {
    color: #6c757d;
}

.empty-icon {
    font-size: 3rem;
    display: block;
    color: #6c757d;
}

.table th {
    font-weight: 600;
    color: #333;
}

/* Fixed status badge styling */
.status-badge {
    padding: 8px 12px;
    font-weight: 500;
    font-size: 0.85rem;
}

/* Animation for loading spinner */
@keyframes spinner {
    to {
        transform: rotate(360deg);
    }
}

.spinner-border {
    width: 3rem;
    height: 3rem;
}

/* Custom file input styling */
.custom-file-container {
    position: relative;
}

.alert {
    border-radius: 8px;
    padding: 15px;
}

.alert-success {
    background-color: #d4edda;
    border-color: #c3e6cb;
    color: #155724;
}

.alert-danger {
    background-color: #f8d7da;
    border-color: #f5c6cb;
    color: #721c24;
}
</style>