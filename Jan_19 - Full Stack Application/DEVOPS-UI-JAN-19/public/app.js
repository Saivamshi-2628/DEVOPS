// Tab switching
document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const tab = btn.dataset.tab;
        
        // Update buttons
        document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        // Update content
        document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
        document.getElementById(`${tab}-tab`).classList.add('active');
        
        // Load data for active tab
        if (tab === 'courses') {
            loadCourses();
        } else {
            loadEnrollments();
        }
    });
});

// Alert function
function showAlert(message, type = 'success') {
    const alert = document.getElementById('alert');
    alert.textContent = message;
    alert.className = `alert ${type}`;
    setTimeout(() => {
        alert.style.display = 'none';
    }, 3000);
}

// API functions
async function apiCall(url, options = {}) {
    try {
        const response = await fetch(url, {
            headers: {
                'Content-Type': 'application/json',
                ...options.headers
            },
            ...options
        });
        
        const data = await response.json();
        
        if (!response.ok) {
            throw new Error(data.message || 'An error occurred');
        }
        
        return data;
    } catch (error) {
        throw error;
    }
}

// Courses
let courses = [];

async function loadCourses() {
    try {
        courses = await apiCall('/courses');
        displayCourses();
    } catch (error) {
        document.getElementById('coursesList').innerHTML = 
            `<div class="empty-state"><h3>Error loading courses</h3><p>${error.message}</p></div>`;
    }
}

function displayCourses() {
    const container = document.getElementById('coursesList');
    
    if (courses.length === 0) {
        container.innerHTML = '<div class="empty-state"><h3>No courses yet</h3><p>Add your first course to get started!</p></div>';
        return;
    }
    
    container.innerHTML = courses.map(course => `
        <div class="card">
            <h3>${escapeHtml(course.title)}</h3>
            ${course.description ? `<p>${escapeHtml(course.description)}</p>` : ''}
            <div class="price">$${parseFloat(course.price).toFixed(2)}</div>
            <span class="status ${course.status}">${course.status.toUpperCase()}</span>
            <div class="card-actions">
                <button class="btn btn-edit" onclick="editCourse(${course.id})">Edit</button>
                <button class="btn btn-danger" onclick="deleteCourse(${course.id})">Delete</button>
            </div>
        </div>
    `).join('');
}

function showCourseForm(courseId = null) {
    const modal = document.getElementById('courseModal');
    const form = document.getElementById('courseForm');
    const title = document.getElementById('courseModalTitle');
    
    form.reset();
    document.getElementById('courseId').value = courseId || '';
    title.textContent = courseId ? 'Edit Course' : 'Add New Course';
    modal.classList.add('active');
    
    if (courseId) {
        const course = courses.find(c => c.id == courseId);
        if (course) {
            document.getElementById('courseTitle').value = course.title;
            document.getElementById('courseDescription').value = course.description || '';
            document.getElementById('coursePrice').value = course.price;
            document.getElementById('courseStatus').value = course.status;
        }
    }
}

function closeCourseForm() {
    document.getElementById('courseModal').classList.remove('active');
}

async function handleCourseSubmit(event) {
    event.preventDefault();
    
    const courseId = document.getElementById('courseId').value;
    const courseData = {
        title: document.getElementById('courseTitle').value,
        description: document.getElementById('courseDescription').value,
        price: parseFloat(document.getElementById('coursePrice').value),
        status: document.getElementById('courseStatus').value
    };
    
    try {
        if (courseId) {
            await apiCall(`/courses/${courseId}`, {
                method: 'PUT',
                body: JSON.stringify(courseData)
            });
            showAlert('Course updated successfully!');
        } else {
            await apiCall('/courses', {
                method: 'POST',
                body: JSON.stringify(courseData)
            });
            showAlert('Course created successfully!');
        }
        
        closeCourseForm();
        loadCourses();
    } catch (error) {
        showAlert(error.message, 'error');
    }
}

async function editCourse(id) {
    showCourseForm(id);
}

async function deleteCourse(id) {
    if (!confirm('Are you sure you want to delete this course?')) return;
    
    try {
        await apiCall(`/courses/${id}`, { method: 'DELETE' });
        showAlert('Course deleted successfully!');
        loadCourses();
    } catch (error) {
        showAlert(error.message, 'error');
    }
}

// Enrollments
let enrollments = [];

async function loadEnrollments() {
    try {
        enrollments = await apiCall('/enrollments');
        await loadCoursesForEnrollment();
        displayEnrollments();
    } catch (error) {
        document.getElementById('enrollmentsList').innerHTML = 
            `<div class="empty-state"><h3>Error loading enrollments</h3><p>${error.message}</p></div>`;
    }
}

async function loadCoursesForEnrollment() {
    if (courses.length === 0) {
        courses = await apiCall('/courses');
    }
    
    const select = document.getElementById('enrollmentCourseId');
    select.innerHTML = '<option value="">Select a course...</option>' +
        courses.map(c => `<option value="${c.id}">${escapeHtml(c.title)}</option>`).join('');
}

function displayEnrollments() {
    const container = document.getElementById('enrollmentsList');
    
    if (enrollments.length === 0) {
        container.innerHTML = '<div class="empty-state"><h3>No enrollments yet</h3><p>Add your first enrollment to get started!</p></div>';
        return;
    }
    
    container.innerHTML = enrollments.map(enrollment => {
        const course = enrollment.Course || courses.find(c => c.id === enrollment.courseId);
        return `
            <div class="card">
                <h3>${escapeHtml(course ? course.title : 'Unknown Course')}</h3>
                <p><strong>Student:</strong> ${escapeHtml(enrollment.studentEmail)}</p>
                <p><strong>Enrolled:</strong> ${new Date(enrollment.enrolledAt).toLocaleDateString()}</p>
                <div class="progress-bar-container" style="margin-top: 10px;">
                    <div style="display: flex; justify-content: space-between; margin-bottom: 5px;">
                        <span>Progress</span>
                        <span><strong>${enrollment.progress}%</strong></span>
                    </div>
                    <div style="background: #e0e0e0; border-radius: 10px; height: 20px; overflow: hidden;">
                        <div style="background: #28a745; height: 100%; width: ${enrollment.progress}%; transition: width 0.3s;"></div>
                    </div>
                </div>
                <div class="card-actions">
                    <button class="btn btn-edit" onclick="editEnrollment(${enrollment.id})">Edit</button>
                    <button class="btn btn-danger" onclick="deleteEnrollment(${enrollment.id})">Delete</button>
                </div>
            </div>
        `;
    }).join('');
}

function showEnrollmentForm(enrollmentId = null) {
    const modal = document.getElementById('enrollmentModal');
    const form = document.getElementById('enrollmentForm');
    const title = document.getElementById('enrollmentModalTitle');
    
    form.reset();
    document.getElementById('enrollmentId').value = enrollmentId || '';
    title.textContent = enrollmentId ? 'Edit Enrollment' : 'Add New Enrollment';
    modal.classList.add('active');
    
    loadCoursesForEnrollment();
    
    if (enrollmentId) {
        const enrollment = enrollments.find(e => e.id == enrollmentId);
        if (enrollment) {
            document.getElementById('enrollmentCourseId').value = enrollment.courseId;
            document.getElementById('enrollmentEmail').value = enrollment.studentEmail;
            document.getElementById('enrollmentProgress').value = enrollment.progress;
        }
    }
}

function closeEnrollmentForm() {
    document.getElementById('enrollmentModal').classList.remove('active');
}

async function handleEnrollmentSubmit(event) {
    event.preventDefault();
    
    const enrollmentId = document.getElementById('enrollmentId').value;
    const enrollmentData = {
        courseId: parseInt(document.getElementById('enrollmentCourseId').value),
        studentEmail: document.getElementById('enrollmentEmail').value,
        progress: parseInt(document.getElementById('enrollmentProgress').value) || 0
    };
    
    try {
        if (enrollmentId) {
            await apiCall(`/enrollments/${enrollmentId}`, {
                method: 'PUT',
                body: JSON.stringify(enrollmentData)
            });
            showAlert('Enrollment updated successfully!');
        } else {
            await apiCall('/enrollments', {
                method: 'POST',
                body: JSON.stringify(enrollmentData)
            });
            showAlert('Enrollment created successfully!');
        }
        
        closeEnrollmentForm();
        loadEnrollments();
    } catch (error) {
        showAlert(error.message, 'error');
    }
}

async function editEnrollment(id) {
    showEnrollmentForm(id);
}

async function deleteEnrollment(id) {
    if (!confirm('Are you sure you want to delete this enrollment?')) return;
    
    try {
        await apiCall(`/enrollments/${id}`, { method: 'DELETE' });
        showAlert('Enrollment deleted successfully!');
        loadEnrollments();
    } catch (error) {
        showAlert(error.message, 'error');
    }
}

// Utility function
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Close modals on outside click
window.onclick = function(event) {
    const courseModal = document.getElementById('courseModal');
    const enrollmentModal = document.getElementById('enrollmentModal');
    
    if (event.target === courseModal) {
        closeCourseForm();
    }
    if (event.target === enrollmentModal) {
        closeEnrollmentForm();
    }
}

// Load initial data
loadCourses();
