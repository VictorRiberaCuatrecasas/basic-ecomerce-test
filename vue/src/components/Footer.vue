<template>
    <Newsletter />
    <div class="bg-background text-gray-600 py-10">
      <div class="container px-4">
        <div class="flex flex-col md:flex-row justify-between mt-10 space-y-8 md:space-y-0">
          <div class="space-y-4">
            <div class="flex space-x-6">
              <img src="../assets/logo.png" alt="VRC Shop logo" class="h-12" />
            </div>
            <div class="mt-6">
              <p class="font-bold">Contact</p>
              <a href="mailto:victor@callmemaybe.com" class="text-gray-500">victor@callmemaybe.com</a>
            </div>
          </div>
  
          <!-- Links Section -->
          <div class="flex gap-8 flex-wrap">
            <div>
              <p class="font-bold pb-1">VRC Supershop</p>
              <ul class="text-gray-500" aria-label="VRC Supershop Links">
                <li><a href="#" aria-label="Go to VRC Shop">VRC shop</a></li>
                <li><a href="#" aria-label="Go to VRC Men">VRC Men</a></li>
                <li><a href="#" aria-label="Go to VRC Women">VRC Women</a></li>
                <li><a href="#" aria-label="Go to VRC Electronics">VRC Electronics</a></li>
                <li><a href="#" aria-label="Go to VRC Jewelry">VRC Jewelry</a></li>
                <li><a href="#" aria-label="Learn more about us">Over ons</a></li>
                <li><a href="#" aria-label="Contact us">Contact</a></li>
                <li><a href="#" aria-label="Sign up for the newsletter">Nieuwsbrief</a></li>
              </ul>
            </div>
            <div>
              <p class="font-bold pb-1">Algemeen</p>
              <ul class="text-gray-500" aria-label="General Links">
                <li><a href="#" aria-label="Find sales points">Verkooppunten</a></li>
                <li><a href="#" aria-label="Become a dealer">Dealer worden</a></li>
                <li><a href="#" aria-label="Read general terms">Algemene voorwaarden</a></li>
                <li><a href="#" aria-label="Read privacy statement & cookies">Privacy statement & cookies</a></li>
                <li><a href="#" aria-label="Work at VRC Supershop">Werken bij Victor supershop</a></li>
              </ul>
            </div>
            <div>
              <p class="font-bold pb-1">Service</p>
              <ul class="text-gray-500" aria-label="Service Links">
                <li><a href="#" aria-label="Customer service">Klantenservice</a></li>
                <li><a href="#" aria-label="Warranty information">Garantie</a></li>
                <li><a href="#" aria-label="Payment methods">Betalen</a></li>
                <li><a href="#" aria-label="Delivery & Return">Levering & Retour</a></li>
                <li><a href="#" aria-label="Frequently Asked Questions">FAQ</a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
  
      <div class="mt-10 border-t-2 pt-6">
        <div class="container flex justify-end items-center">
          <p class="text-sm text-gray-400">&copy; 2024 - VRC Enterprises inc SA</p>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import Newsletter from '../components/Newsletter.vue';
  </script>
  
  <style scoped></style>
  