<template>
    <div class="w-full  mx-auto">
        <div class="mb-6">
            <h1 class="text-2xl font-bold text-gray-900">Profile Settings</h1>
            <p class="text-gray-600 mt-1">Manage your account settings and preferences</p>
        </div>

        <div class="border-b border-gray-200 mb-6">
            <nav class="-mb-px flex space-x-8">
                <RouterLink :to="{ path: '/private/page/admin/profile', query: { tab: 'edit' } }" custom
                    v-slot="{ navigate }">
                    <button @click="navigate" :class="[
                        'py-2 px-1 border-b-2 font-medium text-sm',
                        activeTab === 'edit'
                            ? 'border-purple-500 text-purple-600'
                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 cursor-pointer'
                    ]">
                        <User class="w-4 h-4 inline-block mr-2" />
                        Edit Profile
                    </button>
                </RouterLink>

                <RouterLink :to="{ path: '/private/page/admin/profile', query: { tab: 'password' } }" custom
                    v-slot="{ navigate }">
                    <button @click="navigate" :class="[
                        'py-2 px-1 border-b-2 font-medium text-sm',
                        activeTab === 'password'
                            ? 'border-purple-500 text-purple-600'
                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 cursor-pointer'
                    ]">
                        <Lock class="w-4 h-4 inline-block mr-2" />
                        Change Password
                    </button>
                </RouterLink>
            </nav>
        </div>

        <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div v-if="activeTab === 'edit'">
                <div class="mb-6">
                    <h2 class="text-lg font-semibold text-gray-900">Edit Profile</h2>
                    <p class="text-sm text-gray-600 mt-1">Update your personal information</p>
                </div>

                <form @submit.prevent="handleUpdateProfile" class="space-y-6">
                    <div>
                        <label for="fullname" class="block text-sm font-medium text-gray-700 mb-2">
                            Full Name
                        </label>
                        <div class="relative">
                            <User class="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                            <input id="fullname" v-model="profileForm.fullname" type="text"
                                class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                                placeholder="Enter your full name" :disabled="profileLoading" required />
                        </div>
                    </div>

                    <div>
                        <label for="email" class="block text-sm font-medium text-gray-700 mb-2">
                            Email Address
                        </label>
                        <div class="relative">
                            <Mail class="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                            <input id="email" v-model="profileForm.email" type="email"
                                class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                                placeholder="Enter your email address" :disabled="profileLoading" required />
                        </div>
                    </div>

                    <div class="flex justify-end space-x-3">
                        <button type="button" @click="resetProfileForm"
                            class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none cursor-pointer focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                            :disabled="profileLoading">
                            Reset
                        </button>
                        <button type="submit" :disabled="profileLoading || !isProfileFormChanged"
                            class="px-4 py-2 text-sm font-medium text-white bg-purple-600 border border-transparent rounded-lg hover:bg-purple-700 focus:outline-none cursor-pointer focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:bg-purple-300 disabled:cursor-not-allowed flex items-center gap-2">
                            <div v-if="profileLoading"
                                class="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin">
                            </div>
                            {{ profileLoading ? 'Updating...' : 'Update Profile' }}
                        </button>
                    </div>
                </form>
            </div>
            <div v-if="activeTab === 'password'">
                <div class="mb-6">
                    <h2 class="text-lg font-semibold text-gray-900">Change Password</h2>
                    <p class="text-sm text-gray-600 mt-1">Update your password to keep your account secure</p>
                </div>

                <form @submit.prevent="handleChangePassword" class="space-y-6">
                    <div>
                        <label for="currentPassword" class="block text-sm font-medium text-gray-700 mb-2">
                            Current Password
                        </label>
                        <div class="relative">
                            <Lock class="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                            <input id="currentPassword" v-model="passwordForm.currentPassword"
                                :type="showCurrentPassword ? 'text' : 'password'"
                                class="w-full pl-10 pr-12 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                                placeholder="Enter your current password" :disabled="passwordLoading" required />
                            <button type="button" @click="showCurrentPassword = !showCurrentPassword"
                                class="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                                :disabled="passwordLoading">
                                <Eye v-if="!showCurrentPassword" class="h-5 w-5 cursor-pointer" />
                                <EyeOff v-else class="h-5 w-5 cursor-pointer" />
                            </button>
                        </div>
                    </div>

                    <div>
                        <label for="newPassword" class="block text-sm font-medium text-gray-700 mb-2">
                            New Password
                        </label>
                        <div class="relative">
                            <Lock class="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                            <input id="newPassword" v-model="passwordForm.newPassword"
                                :type="showNewPassword ? 'text' : 'password'"
                                class="w-full pl-10 pr-12 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                                placeholder="Enter your new password" :disabled="passwordLoading" required
                                minlength="6" />
                            <button type="button" @click="showNewPassword = !showNewPassword"
                                class="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                                :disabled="passwordLoading">
                                <Eye v-if="!showNewPassword" class="h-5 w-5 cursor-pointer" />
                                <EyeOff v-else class="h-5 w-5 cursor-pointer" />
                            </button>
                        </div>
                        <p class="mt-1 text-xs text-gray-500">Password must be at least 6 characters long</p>
                    </div>

                    <div>
                        <label for="confirmPassword" class="block text-sm font-medium text-gray-700 mb-2">
                            Confirm New Password
                        </label>
                        <div class="relative">
                            <Lock class="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                            <input id="confirmPassword" v-model="passwordForm.confirmPassword"
                                :type="showConfirmPassword ? 'text' : 'password'"
                                class="w-full pl-10 pr-12 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                                :class="{ 'border-red-300': passwordForm.confirmPassword && !passwordsMatch }"
                                placeholder="Confirm your new password" :disabled="passwordLoading" required />
                            <button type="button" @click="showConfirmPassword = !showConfirmPassword"
                                class="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                                :disabled="passwordLoading">
                                <Eye v-if="!showConfirmPassword" class="h-5 w-5 cursor-pointer" />
                                <EyeOff v-else class="h-5 w-5 cursor-pointer" />
                            </button>
                        </div>
                        <p v-if="passwordForm.confirmPassword && !passwordsMatch" class="mt-1 text-xs text-red-500">
                            Passwords do not match
                        </p>
                    </div>

                    <div v-if="passwordForm.newPassword" class="space-y-2">
                        <label class="block text-sm font-medium text-gray-700">Password Strength</label>
                        <div class="w-full bg-gray-200 rounded-full h-2">
                            <div :class="[
                                'h-2 rounded-full transition-all duration-300',
                                passwordStrength.color
                            ]" :style="{ width: passwordStrength.percentage + '%' }"></div>
                        </div>
                        <p :class="['text-xs', passwordStrength.textColor]">
                            {{ passwordStrength.text }}
                        </p>
                    </div>

                    <div class="bg-blue-50 p-4 rounded-lg">
                        <h3 class="text-sm font-medium text-blue-800 mb-2">Password Security Tips</h3>
                        <ul class="text-xs text-blue-700 space-y-1">
                            <li>• Use at least 6 characters</li>
                            <li>• Include uppercase and lowercase letters</li>
                            <li>• Add numbers and special characters</li>
                            <li>• Avoid common words or personal information</li>
                        </ul>
                    </div>

                    <div class="flex justify-end space-x-3">
                        <button type="button" @click="resetPasswordForm"
                            class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 cursor-pointer"
                            :disabled="passwordLoading">
                            Reset
                        </button>
                        <button type="submit" :disabled="passwordLoading || !isPasswordFormValid"
                            class="px-4 py-2 text-sm font-medium text-white bg-purple-600 border border-transparent rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 cursor-pointer disabled:bg-purple-300 disabled:cursor-not-allowed flex items-center gap-2">
                            <div v-if="passwordLoading"
                                class="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin">
                            </div>
                            {{ passwordLoading ? 'Changing...' : 'Change Password' }}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from "vue";
import { useRoute, useRouter, RouterLink } from "vue-router";
import { User, Lock, Mail, Eye, EyeOff } from "lucide-vue-next";
import AuthApi from "../../../api/authApi";

const route = useRoute();
const router = useRouter();

const activeTab = ref('edit');

const profileLoading = ref(false);
const passwordLoading = ref(false);
const currentUser = ref(null);

const profileForm = ref({
    fullname: '',
    email: ''
});

const originalProfileForm = ref({
    fullname: '',
    email: ''
});

const passwordForm = ref({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
});

const showCurrentPassword = ref(false);
const showNewPassword = ref(false);
const showConfirmPassword = ref(false);

watch(() => route.query.tab, (newTab) => {
    activeTab.value = newTab || 'edit';
}, { immediate: true });

const isProfileFormChanged = computed(() => {
    return profileForm.value.fullname !== originalProfileForm.value.fullname ||
        profileForm.value.email !== originalProfileForm.value.email;
});

const passwordsMatch = computed(() => {
    return passwordForm.value.newPassword === passwordForm.value.confirmPassword;
});

const isPasswordFormValid = computed(() => {
    return passwordForm.value.currentPassword &&
        passwordForm.value.newPassword &&
        passwordForm.value.newPassword.length >= 6 &&
        passwordsMatch.value;
});

const passwordStrength = computed(() => {
    const password = passwordForm.value.newPassword;
    if (!password) return { percentage: 0, color: 'bg-gray-300', text: '', textColor: 'text-gray-500' };

    let score = 0;

    if (password.length >= 6) score += 1;
    if (password.length >= 8) score += 1;

    if (/[a-z]/.test(password)) score += 1;
    if (/[A-Z]/.test(password)) score += 1;
    if (/\d/.test(password)) score += 1;
    if (/[^A-Za-z0-9]/.test(password)) score += 1;

    const percentage = (score / 6) * 100;

    if (score < 2) {
        return {
            percentage,
            color: 'bg-red-500',
            text: 'Weak - Add more characters and variety',
            textColor: 'text-red-600'
        };
    } else if (score < 4) {
        return {
            percentage,
            color: 'bg-yellow-500',
            text: 'Fair - Consider adding more variety',
            textColor: 'text-yellow-600'
        };
    } else if (score < 6) {
        return {
            percentage,
            color: 'bg-blue-500',
            text: 'Good - Your password is secure',
            textColor: 'text-blue-600'
        };
    } else {
        return {
            percentage,
            color: 'bg-green-500',
            text: 'Excellent - Very secure password',
            textColor: 'text-green-600'
        };
    }
});

const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
};

const loadProfile = async () => {
    try {
        const user = AuthApi.getCurrentUser();
        if (user) {
            currentUser.value = user;
            profileForm.value = {
                fullname: user.fullname || '',
                email: user.email || ''
            };
            originalProfileForm.value = {
                fullname: user.fullname || '',
                email: user.email || ''
            };
        }

        const result = await AuthApi.getProfile();
        if (result.success) {
            currentUser.value = result.data;
            profileForm.value = {
                fullname: result.data.fullname || '',
                email: result.data.email || ''
            };
            originalProfileForm.value = {
                fullname: result.data.fullname || '',
                email: result.data.email || ''
            };
        }
    } catch (error) {
        console.error('Error loading profile:', error);
    }
};

const handleUpdateProfile = async () => {
    if (profileLoading.value || !isProfileFormChanged.value) return;

    profileLoading.value = true;

    try {
        const result = await AuthApi.updateProfile(profileForm.value);

        if (result.success) {
            currentUser.value = result.data;
            originalProfileForm.value = {
                fullname: result.data.fullname,
                email: result.data.email
            };
        }
    } catch (error) {
        console.error('Error updating profile:', error);
    } finally {
        profileLoading.value = false;
    }
};

const resetProfileForm = () => {
    profileForm.value = {
        fullname: originalProfileForm.value.fullname,
        email: originalProfileForm.value.email
    };
};

const handleChangePassword = async () => {
    if (passwordLoading.value || !isPasswordFormValid.value) return;

    passwordLoading.value = true;

    try {
        const result = await AuthApi.changePassword(passwordForm.value);

        if (result.success) {
            resetPasswordForm();
        }
    } catch (error) {
        console.error('Error changing password:', error);
    } finally {
        passwordLoading.value = false;
    }
};

const resetPasswordForm = () => {
    passwordForm.value = {
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    };
    showCurrentPassword.value = false;
    showNewPassword.value = false;
    showConfirmPassword.value = false;
};

onMounted(() => {
    loadProfile();
    if (!route.query.tab) {
        router.replace({ query: { tab: 'edit' } });
    }
});
</script>