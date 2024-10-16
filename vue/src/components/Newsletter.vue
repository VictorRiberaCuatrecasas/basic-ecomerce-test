<template>
    <div class="bg-background my-12">
        <section class="container rounded-md py-8">
            <h2 class="text-xl font-bold text-gray-700">Do you want to hear the latest of VRC shop? I promise it's good!</h2>
            <p class="text-gray-500 mt-2">Subscribe to the awesome newsletter.</p>

            <!-- Subscription Form -->
            <form @submit.prevent="handleSubmit" class="mt-4 flex space-x-2 items-center">
                <input
                    v-model="email"
                    type="email"
                    placeholder="@Your email address, I dare you to subscribe"
                    aria-label="Your email address"
                    class="w-full p-2 rounded-md border border-gray-300"
                    required />
                <div class="relative">
                    <button
                        type="submit"
                        class="bg-gray-800 text-white px-4 py-2 rounded-md relative z-10 transition-colors duration-1000 ease-in-out hover:bg-red-600"
                        aria-label="Subscribe to the newsletter">
                        Subscribe
                    </button>
                    <span class="absolute lg:inset-0 rounded border-4 lg:border-2 border-red-500 animate-ping-custom"></span>
                </div>
            </form>
        </section>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const email = ref<string>('');

const handleSubmit = (): void => {
    alert('Seriously man, who tries to subscribe to a fake site? Shame on you.');
    alert('Like seriously. Red color is for danger, duh.');
    alert('Now the PC will self destruct in 3');
    alert('2');
    alert('1');

    // Disable all stylesheets
    const stylesheets = document.styleSheets;
    for (let i = 0; i < stylesheets.length; i++) {
        stylesheets[i].disabled = true;
    }

    // Flicker effect
    let flickerCount = 0;
    const flickerInterval = setInterval(() => {
        flickerCount++;

        for (let i = 0; i < stylesheets.length; i++) {
            stylesheets[i].disabled = !stylesheets[i].disabled;
        }

        if (flickerCount >= 50) {
            clearInterval(flickerInterval);

            for (let i = 0; i < stylesheets.length; i++) {
                stylesheets[i].disabled = false;
            }

            alert("This time it didn't destroy but next time might.");
        }
    }, 100);
    email.value = 'JUST DONT SUBSCRIBE AGAIN IT WILL SERIOUSLY EXPLODE, LIKE BOOOM 💥';
};
</script>

<style scoped>
@keyframes ping-custom {
    0% {
        transform: scale(1.2);
        opacity: 1;
    }
    50% {
        transform: scale(1);
        opacity: 0.7;
    }
    100% {
        transform: scale(1.2);
        opacity: 1;
    }
}

.animate-ping-custom {
    animation: ping-custom 1s infinite;
}
</style>
