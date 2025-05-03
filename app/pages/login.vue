<template>
    <div class="min-h-screen p-8">
        <UButton @click="login">Login with Google</UButton>
    </div>
</template>

<script setup lang="ts">
const client = useSupabaseClient();

const login = async () => {
    const response = await client.auth.signInWithOAuth({provider: 'google', options: {redirectTo: `${useRequestURL().host}/confirm`}})
}
</script>