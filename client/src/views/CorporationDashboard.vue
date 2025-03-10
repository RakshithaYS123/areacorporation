<template>
    <div class="dashboard-container">
        <div class="dashboard-header">
            <h2>Corporation Dashboard</h2>
        </div>

        <!-- Issue Summary Cards -->
        <div class="stats-container">
            <div class="stat-card">
                <div class="stat-icon total-icon">
                    <i class="fas fa-clipboard-list"></i>
                </div>
                <div class="stat-info">
                    <h5>Total Issues</h5>
                    <p class="stat-value">{{ issues.length }}</p>
                </div>
            </div>

            <div class="stat-card">
                <div class="stat-icon pending-icon">
                    <i class="fas fa-clock"></i>
                </div>
                <div class="stat-info">
                    <h5>Pending Issues</h5>
                    <p class="stat-value">{{ getPendingIssuesCount }}</p>
                </div>
            </div>

            <div class="stat-card">
                <div class="stat-icon resolved-icon">
                    <i class="fas fa-check-circle"></i>
                </div>
                <div class="stat-info">
                    <h5>Resolved Issues</h5>
                    <p class="stat-value">{{ getResolvedIssuesCount }}</p>
                </div>
            </div>
        </div>

        <!-- Search with Icon -->
        <div class="search-container">
            <div class="search-input">
                <i class="fas fa-search search-icon"></i>
                <input v-model="searchQuery" class="form-control"
                    placeholder="Search issues by address or description..." />
            </div>
        </div>

        <!-- Loading State -->
        <div v-if="loading" class="loading-container">
            <div class="spinner-border" role="status">
                <span class="sr-only">Loading...</span>
            </div>
            <p class="loading-text">Loading issues...</p>
        </div>

        <!-- Issues Table -->
        <div v-else class="table-container">
            <div v-if="filteredIssues.length" class="table-responsive">
                <table class="table">
                    <thead>
                        <tr>
                            <th>Image</th>
                            <th>Address</th>
                            <th>Description</th>
                            <th>Reported By</th>
                            <th>Date</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="issue in filteredIssues" :key="issue._id" class="table-row">
                            <td>
                                <div class="image-cell">
                                    <img v-if="issue.imagePath" :src="getImageUrl(issue.imagePath)" alt="Issue Image"
                                        class="issue-image" @click="showImageModal(issue)"
                                        @error="handleImageError($event)" />
                                    <div v-else class="no-image">
                                        <i class="fas fa-image"></i>
                                    </div>
                                </div>
                            </td>
                            <td>{{ issue.address }}</td>
                            <td class="description-cell">{{ issue.description }}</td>
                            <td>{{ issue.user?.name || 'Unknown' }}</td>
                            <td>{{ formatDate(issue.createdAt) }}</td>
                            <td>
                                <span :class="getStatusBadgeClass(issue.status)">
                                    {{ getStatusLabel(issue.status) }}
                                </span>
                            </td>
                            <td>
                                <select v-model="issue.status" class="status-select" @change="updateStatus(issue)"
                                    :disabled="statusUpdating[issue._id]">
                                    <option value="pending">Pending</option>
                                    <option value="in-progress">In Progress</option>
                                    <option value="resolved">Resolved</option>
                                </select>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div v-else class="no-issues">
                <i class="fas fa-clipboard-check empty-icon"></i>
                <p>There are no reported issues at the moment.</p>
            </div>
        </div>

        <!-- Enhanced Image Modal -->
        <div v-if="selectedIssue" class="modal-overlay" @click.self="selectedIssue = null">
            <div class="modal-content">
                <div class="modal-header">
                    <h5>Issue Details</h5>
                    <button type="button" class="close-btn" @click="selectedIssue = null">&times;</button>
                </div>
                <div class="modal-body">
                    <div v-if="selectedIssue.imagePath" class="image-container">
                        <img :src="getImageUrl(selectedIssue.imagePath)" class="modal-image" alt="Issue Image"
                            @click="toggleImageZoom" :class="{ 'zoomed': isImageZoomed }"
                            @error="handleModalImageError($event)" />
                        <div v-if="imageLoading" class="image-loading-overlay">
                            <div class="spinner-border text-light" role="status">
                                <span class="sr-only">Loading image...</span>
                            </div>
                        </div>
                    </div>
                    <div v-else class="no-image-placeholder">
                        <i class="fas fa-image fa-3x text-muted"></i>
                        <p class="mt-2">No image available</p>
                    </div>
                    <div class="issue-details">
                        <div class="detail-item">
                            <span class="detail-label">Address:</span>
                            <span class="detail-value">{{ selectedIssue.address }}</span>
                        </div>
                        <div class="detail-item">
                            <span class="detail-label">Description:</span>
                            <span class="detail-value">{{ selectedIssue.description }}</span>
                        </div>
                        <div class="detail-item">
                            <span class="detail-label">Status:</span>
                            <span :class="['detail-value', getStatusBadgeClass(selectedIssue.status)]">
                                {{ getStatusLabel(selectedIssue.status) }}
                            </span>
                        </div>
                        <div class="detail-item">
                            <span class="detail-label">Reported on:</span>
                            <span class="detail-value">{{ formatDate(selectedIssue.createdAt) }}</span>
                        </div>
                        <div v-if="selectedIssue.user" class="detail-item">
                            <span class="detail-label">Reported by:</span>
                            <span class="detail-value">{{ selectedIssue.user.name }}</span>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button @click="updateIssueStatus(selectedIssue)" class="btn-update"
                        :disabled="statusUpdating[selectedIssue._id]">
                        <i class="fas fa-sync-alt mr-1"></i>
                        {{ statusUpdating[selectedIssue._id] ? 'Updating...' : 'Update Status' }}
                    </button>
                    <button @click="selectedIssue = null" class="btn-close">
                        <i class="fas fa-times mr-1"></i>
                        Close
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue';
import { useStore } from 'vuex';

export default {
    name: 'CorporationDashboard',
    setup() {
        const store = useStore();
        const searchQuery = ref('');
        const selectedIssue = ref(null);
        const statusUpdating = ref({});
        const loading = ref(false);
        const isImageZoomed = ref(false);
        const imageLoading = ref(false);
        const apiBaseUrl = process.env.VUE_APP_API_URL || '';

        // Fetch Issues from Vuex Store
        const issues = computed(() => store.getters.issues);
        const filteredIssues = computed(() => {
            if (!searchQuery.value) return issues.value;
            const query = searchQuery.value.toLowerCase();
            return issues.value.filter(issue =>
                issue.address.toLowerCase().includes(query) ||
                issue.description.toLowerCase().includes(query)
            );
        });

        const getPendingIssuesCount = computed(() =>
            issues.value.filter(issue => issue.status === 'pending').length
        );

        const getResolvedIssuesCount = computed(() =>
            issues.value.filter(issue => issue.status === 'resolved').length
        );

        // Get image URL from local storage path
        const getImageUrl = (imagePath) => {
            if (!imagePath) return null;

            // Handle both relative and absolute paths
            if (imagePath.startsWith('http')) {
                return imagePath;
            }

            // Remove any leading slash to prevent double slashes
            const cleanPath = imagePath.startsWith('/') ? imagePath.substring(1) : imagePath;
            return `${apiBaseUrl}/uploads/${cleanPath}`;
        };

        // Handle image loading errors
        const handleImageError = (event) => {
            // Replace with a placeholder image or default icon
            event.target.src = `${apiBaseUrl}/assets/placeholder-image.png`;
            // If placeholder doesn't exist, hide the image
            event.target.onerror = () => {
                event.target.style.display = 'none';
                event.target.parentElement.innerHTML = '<div class="no-image"><i class="fas fa-image"></i></div>';
            };
        };

        // Handle modal image loading errors
        const handleModalImageError = (event) => {
            // Replace with a placeholder image
            event.target.src = `${apiBaseUrl}/assets/placeholder-image.png`;
            // If placeholder doesn't exist, show text message
            event.target.onerror = () => {
                event.target.style.display = 'none';
                event.target.parentElement.innerHTML = '<div class="image-error"><i class="fas fa-exclamation-circle"></i><p>Image could not be loaded</p></div>';
            };
        };

        // Badge Class based on Status
        const getStatusBadgeClass = (status) => ({
            'pending': 'status-badge status-pending',
            'in-progress': 'status-badge status-in-progress',
            'resolved': 'status-badge status-resolved'
        }[status] || 'status-badge status-default');

        // Status Labels
        const getStatusLabel = (status) => ({
            'pending': 'Pending',
            'in-progress': 'In Progress',
            'resolved': 'Resolved'
        }[status] || status);

        // Format date
        const formatDate = (dateString) => {
            if (!dateString) return 'N/A';
            return new Date(dateString).toLocaleDateString();
        };

        // Show image modal
        const showImageModal = (issue) => {
            selectedIssue.value = { ...issue }; // Clone to avoid direct mutation
            isImageZoomed.value = false; // Reset zoom state

            // Show loading indicator while the full-size image loads
            if (issue.imagePath) {
                imageLoading.value = true;
                const img = new Image();
                img.onload = () => {
                    imageLoading.value = false;
                };
                img.onerror = () => {
                    imageLoading.value = false;
                };
                img.src = getImageUrl(issue.imagePath);
            }
        };

        // Toggle image zoom
        const toggleImageZoom = () => {
            isImageZoomed.value = !isImageZoomed.value;
        };

        // Fetch All Issues
        const fetchAllIssues = async () => {
            loading.value = true;
            try {
                await store.dispatch('getAllIssues');
            } catch (err) {
                console.error('Failed to fetch issues:', err);
                // Show error notification to user
                alert('Failed to load issues. Please try refreshing the page.');
            } finally {
                loading.value = false;
            }
        };

        // Update Issue Status
        const updateStatus = async (issue) => {
            statusUpdating.value = { ...statusUpdating.value, [issue._id]: true };
            try {
                await store.dispatch('updateIssueStatus', {
                    issueId: issue._id,
                    status: issue.status
                });

                // If the selected issue is being updated, update it in the modal too
                if (selectedIssue.value && selectedIssue.value._id === issue._id) {
                    selectedIssue.value.status = issue.status;
                }
            } catch (err) {
                console.error('Failed to update issue status:', err);
                alert('Failed to update status. Please try again.');
                // Revert to previous status
                const originalIssue = issues.value.find(i => i._id === issue._id);
                if (originalIssue) {
                    issue.status = originalIssue.status;
                }
            } finally {
                statusUpdating.value = { ...statusUpdating.value, [issue._id]: false };
            }
        };

        // Update issue status from the modal
        const updateIssueStatus = async (issue) => {
            if (!issue || statusUpdating.value[issue._id]) return;

            await updateStatus(issue);

            // Find the issue in the main table and update it
            const tableIssue = issues.value.find(i => i._id === issue._id);
            if (tableIssue) {
                tableIssue.status = issue.status;
            }
        };

        onMounted(fetchAllIssues);

        return {
            searchQuery,
            selectedIssue,
            statusUpdating,
            loading,
            imageLoading,
            isImageZoomed,
            issues,
            filteredIssues,
            getPendingIssuesCount,
            getResolvedIssuesCount,
            getImageUrl,
            getStatusBadgeClass,
            getStatusLabel,
            formatDate,
            showImageModal,
            toggleImageZoom,
            updateStatus,
            updateIssueStatus,
            handleImageError,
            handleModalImageError
        };
    }
};
</script>

<style>
:root {
    --primary-color: #007bff;
    --secondary-color: #6c757d;
    --success-color: #28a745;
    --warning-color: #ffc107;
    --light-color: #f8f9fa;
    --dark-color: #343a40;
    --body-bg: #f5f8fa;
    --card-bg: #ffffff;
    --border-color: #e9ecef;
    --shadow-sm: 0 2px 4px rgba(0, 0, 0, 0.05);
    --shadow-md: 0 4px 6px rgba(0, 0, 0, 0.1);
    --shadow-lg: 0 10px 15px rgba(0, 0, 0, 0.1);
    --radius-sm: 4px;
    --radius-md: 8px;
    --radius-lg: 12px;
}

/* Main Container */
body {
    background-color: var(--body-bg);
    font-family: 'Segoe UI', Roboto, Arial, sans-serif;
    color: var(--dark-color);
    margin: 0;
    padding: 0;
}

.dashboard-container {
    padding: 2rem;
    max-width: 1600px;
    margin: 0 auto;
}

.dashboard-header {
    margin-bottom: 2rem;
    border-bottom: 2px solid var(--primary-color);
    padding-bottom: 1rem;
}

.dashboard-header h2 {
    color: var(--dark-color);
    font-weight: 600;
    margin: 0;
    font-size: 1.8rem;
}

/* Stats Section */
.stats-container {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 1.5rem;
    margin-bottom: 2rem;
}

.stat-card {
    background-color: var(--card-bg);
    border-radius: var(--radius-md);
    padding: 1.5rem;
    display: flex;
    align-items: center;
    box-shadow: var(--shadow-md);
    transition: transform 0.3s, box-shadow 0.3s;
}

.stat-card:hover {
    transform: translateY(-5px);
    box-shadow: var(--shadow-lg);
}

.stat-icon {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 1rem;
    font-size: 1.5rem;
    color: white;
}

.total-icon {
    background: linear-gradient(135deg, #6a11cb 0%, #2575fc 100%);
}

.pending-icon {
    background: linear-gradient(135deg, #f9a825 0%, #ff6f00 100%);
}

.resolved-icon {
    background: linear-gradient(135deg, #11998e 0%, #38ef7d 100%);
}

.stat-info {
    flex-grow: 1;
}

.stat-info h5 {
    font-size: 1rem;
    margin: 0 0 0.5rem 0;
    color: var(--secondary-color);
}

.stat-value {
    font-size: 2rem;
    font-weight: 700;
    margin: 0;
    color: var(--dark-color);
}

/* Search */
.search-container {
    margin-bottom: 2rem;
}

.search-input {
    position: relative;
    width: 100%;
}

.search-icon {
    position: absolute;
    left: 15px;
    top: 50%;
    transform: translateY(-50%);
    color: var(--secondary-color);
}

.search-input input {
    padding: 12px 20px 12px 45px;
    border-radius: var(--radius-md);
    border: 1px solid var(--border-color);
    box-shadow: var(--shadow-sm);
    width: 100%;
    font-size: 1rem;
    transition: box-shadow 0.3s;
}

.search-input input:focus {
    box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.25);
    border-color: var(--primary-color);
    outline: none;
}

/* Loading State */
.loading-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 3rem;
    background-color: var(--card-bg);
    border-radius: var(--radius-md);
    box-shadow: var(--shadow-sm);
}

.loading-text {
    margin-top: 1rem;
    color: var(--secondary-color);
}

/* Table */
.table-container {
    background-color: var(--card-bg);
    border-radius: var(--radius-md);
    box-shadow: var(--shadow-md);
    overflow: hidden;
}

.table {
    width: 100%;
    border-collapse: collapse;
    font-size: 0.95rem;
}

.table th {
    background-color: #f1f5f9;
    color: var(--dark-color);
    font-weight: 600;
    padding: 1rem;
    text-align: left;
    border-bottom: 1px solid var(--border-color);
}

.table td {
    padding: 1rem;
    vertical-align: middle;
    border-bottom: 1px solid var(--border-color);
}

.table-row:hover {
    background-color: rgba(37, 117, 252, 0.05);
}

.image-cell {
    width: 60px;
    height: 60px;
    display: flex;
    justify-content: center;
    align-items: center;
}

.issue-image {
    width: 50px;
    height: 50px;
    object-fit: cover;
    border-radius: var(--radius-sm);
    cursor: pointer;
    transition: transform 0.2s;
    box-shadow: var(--shadow-sm);
}

.issue-image:hover {
    transform: scale(1.1);
}

.no-image {
    width: 50px;
    height: 50px;
    background-color: #e9ecef;
    border-radius: var(--radius-sm);
    display: flex;
    justify-content: center;
    align-items: center;
    color: #adb5bd;
}

.description-cell {
    max-width: 250px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

/* Status Badge */
.status-badge {
    display: inline-block;
    padding: 0.4rem 0.8rem;
    border-radius: 50px;
    font-size: 0.8rem;
    font-weight: 600;
    text-align: center;
}

.status-pending {
    background-color: #fff3cd;
    color: #856404;
}

.status-in-progress {
    background-color: #cce5ff;
    color: #004085;
}

.status-resolved {
    background-color: #d4edda;
    color: #155724;
}

.status-default {
    background-color: #e2e3e5;
    color: #383d41;
}

/* Status Select */
.status-select {
    padding: 0.4rem 0.8rem;
    border-radius: var(--radius-sm);
    border: 1px solid var(--border-color);
    background-color: white;
    font-size: 0.9rem;
    cursor: pointer;
    transition: border-color 0.3s, box-shadow 0.3s;
}

.status-select:focus {
    border-color: var(--primary-color);
    box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.25);
    outline: none;
}

/* Empty State */
.no-issues {
    padding: 3rem;
    text-align: center;
    color: var(--secondary-color);
}

.empty-icon {
    font-size: 3rem;
    margin-bottom: 1rem;
    color: #ced4da;
}

/* Modal */
.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.6);
    backdrop-filter: blur(3px);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
}

.modal-content {
    background: white;
    border-radius: var(--radius-lg);
    max-width: 700px;
    width: 90%;
    max-height: 90vh;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
}

.modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1.5rem;
    border-bottom: 1px solid var(--border-color);
}

.modal-header h5 {
    font-size: 1.25rem;
    font-weight: 600;
    margin: 0;
}

.close-btn {
    background: none;
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
    color: var(--secondary-color);
}

.close-btn:hover {
    color: var(--dark-color);
}

.modal-body {
    padding: 1.5rem;
    overflow-y: auto;
}

.image-container {
    position: relative;
    margin-bottom: 1.5rem;
    text-align: center;
    min-height: 200px;
    display: flex;
    justify-content: center;
    align-items: center;
}

.modal-image {
    max-width: 100%;
    max-height: 300px;
    border-radius: var(--radius-md);
    object-fit: contain;
    cursor: zoom-in;
    transition: transform 0.3s;
}

.modal-image.zoomed {
    transform: scale(1.5);
    cursor: zoom-out;
    max-height: 500px;
}

.image-loading-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: var(--radius-md);
}

.no-image-placeholder {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: #f8f9fa;
    padding: 2rem;
    border-radius: var(--radius-md);
    margin-bottom: 1.5rem;
}

.image-error {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: #f8d7da;
    color: #721c24;
    padding: 2rem;
    border-radius: var(--radius-md);
}

.issue-details {
    text-align: left;
}

.detail-item {
    margin-bottom: 1rem;
    display: flex;
}

.detail-label {
    font-weight: 600;
    width: 120px;
    color: var(--secondary-color);
}

.detail-value {
    flex: 1;
}

.modal-footer {
    padding: 1.5rem;
    border-top: 1px solid var(--border-color);
    display: flex;
    justify-content: flex-end;
}

.btn-update {
    background-color: var(--primary-color);
    color: white;
    border: none;
    padding: 0.6rem 1.2rem;
    border-radius: var(--radius-md);
    font-weight: 500;
    cursor: pointer;
    transition: background-color 0.3s;
    display: flex;
    align-items: center;
    gap: 0.5rem;
}

.btn-update:hover:not(:disabled) {
    background-color: #0062cc;
}

.btn-update:disabled {
    opacity: 0.7;
    cursor: not-allowed;
}

.btn-close {
    background-color: var(--secondary-color);
    color: white;
    border: none;
    padding: 0.6rem 1.2rem;
    border-radius: var(--radius-md);
    font-weight: 500;
    cursor: pointer;
    transition: background-color 0.3s;
    margin-left: 0.75rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
}

.btn-close:hover {
    background-color: #5a6268;
}

/* Responsive */
@media (max-width: 768px) {
    .dashboard-container {
        padding: 1rem;
    }

    .stats-container {
        grid-template-columns: 1fr;
    }

    .table th,
    .table td {
        padding: 0.75rem;
    }

    .description-cell {
        max-width: 150px;
    }

    .modal-content {
        width: 95%;
    }

    .detail-item {
        flex-direction: column;
    }

    .detail-label {
        width: 100%;
        margin-bottom: 0.25rem;
    }
}
</style>