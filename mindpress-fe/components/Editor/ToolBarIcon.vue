<template>
    <div style="display: inline-flex;">
        <UTooltip v-if="tips" :text="tips" :popper="{ arrow: true }">
            <span v-if="iconSVG" class="toobaricon" v-html="iconSVG" />
            <span v-if="!iconSVG" class="toobaricon">{{ icon }}</span>
        </UTooltip>
        <span v-if="iconSVG && !tips" class="toobaricon" v-html="iconSVG" />
        <span v-if="!iconSVG && !tips" class="toobaricon">{{ icon }}</span>
    </div>
</template>

<script lang="ts">

const ICONS = {
    bold: `<svg xmlns="http://www.w3.org/2000/svg" width="27" height="24" viewBox="0 0 24 24">
                            <g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                stroke-width="1.5">
                                <path d="M6 3.75h7.125a4.125 4.125 0 1 1 0 8.25H6z" />
                                <path
                                    d="M7.5 4.5h4.875a3.375 3.375 0 1 1 0 6.75H7.5zM6 11.25h7.5a4.5 4.5 0 1 1 0 9H6z" />
                                <path d="M7.5 12h5.25a3.75 3.75 0 1 1 0 7.5H7.5z" />
                            </g>
                        </svg>`,
    underline: ` <svg xmlns="http://www.w3.org/2000/svg" width="27" height="24" viewBox="0 0 24 24">
                            <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                stroke-width="1.5" d="M18 3.75v7.5a6 6 0 0 1-12 0v-7.5m-2.25 16.5h16.5" />
                        </svg>`,
    italic: `<svg xmlns="http://www.w3.org/2000/svg" width="27" height="22" viewBox="0 0 24 24">
                            <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                stroke-width="1.5"
                                d="M11.25 3.75h3.696m3.804 0h-3.804M5.25 20.25h3.804m3.696 0H9.054m0 0l5.892-16.5" />
                        </svg>`,
    strike: `<svg xmlns="http://www.w3.org/2000/svg" width="27" height="24" viewBox="0 0 256 256">
                            <path fill="currentColor"
                                d="M224 128a8 8 0 0 1-8 8h-40.07c9.19 7.11 16.07 17.2 16.07 32c0 13.34-7 25.7-19.75 34.79C160.33 211.31 144.61 216 128 216s-32.33-4.69-44.25-13.21C71 193.7 64 181.34 64 168a8 8 0 0 1 16 0c0 17.35 22 32 48 32s48-14.65 48-32c0-14.85-10.54-23.58-38.77-32H40a8 8 0 0 1 0-16h176a8 8 0 0 1 8 8M76.33 104a8 8 0 0 0 7.61-10.49a17.3 17.3 0 0 1-.83-5.51c0-18.24 19.3-32 44.89-32c18.84 0 34.16 7.42 41 19.85a8 8 0 0 0 14-7.7C173.33 50.52 152.77 40 128 40c-34.71 0-60.89 20.63-60.89 48a33.7 33.7 0 0 0 1.62 10.49a8 8 0 0 0 7.6 5.51" />
                        </svg>`,
    subscript: ` <svg xmlns="http://www.w3.org/2000/svg" width="27" height="24" viewBox="0 0 24 24">
                            <path fill="currentColor"
                                d="M19 20v-2q0-.425.288-.712T20 17h2v-1h-3v-1h3q.425 0 .713.288T23 16v1q0 .425-.288.713T22 18h-2v1h3v1zM5.875 18l4.625-7.275L6.2 4h2.65l3.1 5h.1l3.075-5H17.8l-4.325 6.725L18.125 18H15.45l-3.4-5.425h-.1L8.55 18z" />
                        </svg>`,
    superscript: `<svg xmlns="http://www.w3.org/2000/svg" width="27" height="24" viewBox="0 0 24 24">
                            <path fill="currentColor"
                                d="M19 9V7q0-.425.288-.712T20 6h2V5h-3V4h3q.425 0 .713.288T23 5v1q0 .425-.288.713T22 7h-2v1h3v1zM5.875 20l4.625-7.275L6.2 6h2.65l3.1 5h.1l3.075-5H17.8l-4.325 6.725L18.125 20H15.45l-3.4-5.425h-.1L8.55 20z" />
                        </svg>`,
    image: ` <svg xmlns="http://www.w3.org/2000/svg" width="28" height="24" viewBox="0 0 16 16">
                            <path fill="currentColor" fill-rule="evenodd"
                                d="M2 4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2zm10.5 5.707a.5.5 0 0 0-.146-.353l-1-1a.5.5 0 0 0-.708 0L9.354 9.646a.5.5 0 0 1-.708 0L6.354 7.354a.5.5 0 0 0-.708 0l-2 2a.5.5 0 0 0-.146.353V12a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5zM12 5a1 1 0 1 1-2 0a1 1 0 0 1 2 0"
                                clip-rule="evenodd" />
                        </svg>`,
    recover: `<svg xmlns="http://www.w3.org/2000/svg" width="28" height="22" viewBox="0 0 24 24">
                            <g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                stroke-width="1.5" color="currentColor">
                                <path d="M3 12c0 1.657 3.582 3 8 3q.508 0 1-.023" />
                                <path d="M19 5v6.5M3 5v14c0 1.657 3.582 3 8 3q.508 0 1-.023" />
                                <ellipse cx="11" cy="5" rx="8" ry="3" />
                                <path
                                    d="M7 8v2m0 5v2m12.987-3l.5 2.084l-.83-.518a3.5 3.5 0 0 0-2.122-.715c-1.952 0-3.535 1.6-3.535 3.575C14 20.4 15.583 22 17.535 22c1.71 0 3.137-1.228 3.465-2.86" />
                            </g>
                        </svg>`,
    unrecover: `  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="24" viewBox="0 0 24 24">
                            <path fill="currentColor" fill-rule="evenodd"
                                d="M1.25 12C1.25 6.063 6.063 1.25 12 1.25S22.75 6.063 22.75 12S17.937 22.75 12 22.75S1.25 17.937 1.25 12m16.321-.89l-.05.055l-3.5 3.375a.75.75 0 1 1-1.042-1.08l2.163-2.085H9.789l-.062.004a2.5 2.5 0 0 0-.982.281a1.74 1.74 0 0 0-.673.624c-.178.288-.322.71-.322 1.341c0 1.438.567 2.032 1.029 2.312a2.25 2.25 0 0 0 1.014.313h.807a.75.75 0 0 1 0 1.5h-.8a3.7 3.7 0 0 1-1.798-.53c-.933-.565-1.752-1.658-1.752-3.595c0-.87.202-1.572.545-2.128c.341-.554.796-.92 1.238-1.157A4 4 0 0 1 9.8 9.875h5.433L12.96 7.521a.75.75 0 0 1 1.08-1.042l3.498 3.623a.75.75 0 0 1 .033 1.009"
                                clip-rule="evenodd" />
                        </svg>`,
    diff: ` <svg xmlns="http://www.w3.org/2000/svg" width="28" height="24" viewBox="0 0 24 24">
                            <g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                stroke-width="1.5">
                                <path d="M18 21a3 3 0 1 0 0-6a3 3 0 0 0 0 6m0-6V7.5a2 2 0 0 0-2-2h-2.5" />
                                <path
                                    d="M14.5 8L12 5.5L14.5 3M6 3a3 3 0 1 0 0 6a3 3 0 0 0 0-6m0 6v7.5a2 2 0 0 0 2 2h2.5" />
                                <path d="m9.5 16l2.5 2.5L9.5 21" />
                            </g>
                        </svg>`,
    pub:
        `<svg xmlns="http://www.w3.org/2000/svg" width="28" height="24" viewBox="0 0 448 512">
                                <path fill="currentColor"
                                    d="M48 32C21.5 32 0 53.5 0 80v352c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V80c0-26.5-21.5-48-48-48zm137.371 64.012c1.358.141 2.211 1.495 3.09 2.44c1.96 8.586 2.478 17.438 4.15 26.091c3.49-4.01 7.262-7.78 11.51-11c19.77-15.215 46.636-21.572 70.875-14.87c16.13 4.422 29.656 15.396 39.899 28.33c4.297 5.592 8.144 11.6 10.828 18.147h-.002c4.841 11.511 6.324 24.116 6.384 36.512c.313 17.991-2.767 36.138-9.757 52.762c-8.826 21.21-24.453 39.866-44.815 50.8c-16.163 8.867-35.043 12.49-53.363 10.73c-10.547-.931-21.062-3.203-30.744-7.567c.083 23.398.437 46.79.693 70.181c.387 10.523-.38 21.186 1.695 31.577c.7 2.774 1.608 5.937 4.21 7.517c2.609 1.457 5.721 1.037 8.585 1.111c4.924.051 9.848-.172 14.772.082c1.564 0 3.4.857 3.433 2.66c.272 4.06.322 8.185-.033 12.253c-.395 2.263-3.211 2.24-4.998 2.23c-22.75-1.374-45.556-1.776-68.345-1.332c-11.922.14-23.837 1.004-35.758 1.316c-.585-.716-1.721-1.21-1.713-2.255c-.172-3.812-.05-7.624-.067-11.428c-.106-1.432.494-3.287 2.2-3.352c6.38-.568 12.827.165 19.216-.328c4.266-.773 6.504-5.138 7.196-9.04c1.343-8.292.8-16.722 1.228-25.079c.025-66.148 0-132.304.016-198.453c-.008-1.819-.068-3.63-.24-5.434c-.388-5.45-2.65-10.868-6.932-14.392c-4.767-4.11-10.623-6.62-16.057-9.674c-2.068-1.26-4.611-2.33-5.632-4.668c-.32-2.38-.346-4.841.025-7.213c1.136-1.77 3.36-2.207 5.139-3.055c16.845-7.318 33.642-14.761 50.496-22.09c3.912-1.597 7.904-3.407 12.203-3.49c.216-.034.42-.04.613-.02m47.938 26.629a39.937 39.937 0 0 0-6.924.404c-12.886 1.77-25.237 8.66-32.836 19.314c-.288 33.667-.023 67.36-.131 101.036c-.108 7.73 2.002 15.956 7.674 21.505c6.63 5.723 14.49 10.176 23.152 11.89c11.156 2.212 23.499 2.912 33.774-2.81c12.178-6.52 19.531-19.298 23.162-32.234c5.772-20.79 4.617-42.863.484-63.842c-3.459-15.965-9.352-32.276-21.291-43.91c-7.159-7.084-17.046-11.07-27.064-11.353" />
                            </svg>`,
    save: `<svg xmlns="http://www.w3.org/2000/svg" width="28" height="24" viewBox="0 0 32 32">
                            <path fill="currentColor"
                                d="m27.71 9.29l-5-5A1 1 0 0 0 22 4H6a2 2 0 0 0-2 2v20a2 2 0 0 0 2 2h20a2 2 0 0 0 2-2V10a1 1 0 0 0-.29-.71M12 6h8v4h-8Zm8 20h-8v-8h8Zm2 0v-8a2 2 0 0 0-2-2h-8a2 2 0 0 0-2 2v8H6V6h4v4a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V6.41l4 4V26Z" />
                        </svg>`,
    copyToWeChat: `<svg xmlns="http://www.w3.org/2000/svg" width="28" height="24" viewBox="0 0 24 24">
                            <path fill="currentColor"
                                d="M15.85 8.14c.39 0 .77.03 1.14.08C16.31 5.25 13.19 3 9.44 3c-4.25 0-7.7 2.88-7.7 6.43c0 2.05 1.15 3.86 2.94 5.04L3.67 16.5l2.76-1.19c.59.21 1.21.38 1.87.47c-.09-.39-.14-.79-.14-1.21c-.01-3.54 3.44-6.43 7.69-6.43M12 5.89a.96.96 0 1 1 0 1.92a.96.96 0 0 1 0-1.92M6.87 7.82a.96.96 0 1 1 0-1.92a.96.96 0 0 1 0 1.92" />
                            <path fill="currentColor"
                                d="M22.26 14.57c0-2.84-2.87-5.14-6.41-5.14s-6.41 2.3-6.41 5.14s2.87 5.14 6.41 5.14c.58 0 1.14-.08 1.67-.2L20.98 21l-1.2-2.4c1.5-.94 2.48-2.38 2.48-4.03m-8.34-.32a.96.96 0 1 1 .96-.96c.01.53-.43.96-.96.96m3.85 0a.96.96 0 1 1 0-1.92a.96.96 0 0 1 0 1.92" />
                        </svg>`,
    fullPage: `<svg xmlns="http://www.w3.org/2000/svg" width="28" height="24"
                            viewBox="0 0 24 24">
                            <path fill="currentColor"
                                d="M22 3.41L16.71 8.7L20 12h-8V4l3.29 3.29L20.59 2zM3.41 22l5.29-5.29L12 20v-8H4l3.29 3.29L2 20.59z" />
                        </svg>`,
    nonfullPage: ` <svg  xmlns="http://www.w3.org/2000/svg" width="28" height="24"
                            viewBox="0 0 24 24">
                            <path fill="currentColor" d="M21 11V3h-8l3.29 3.29l-10 10L3 13v8h8l-3.29-3.29l10-10z" />
                        </svg>`,
    screenfull: `<svg  xmlns="http://www.w3.org/2000/svg" width="28" height="24"
                            viewBox="0 0 24 24">
                            <path fill="currentColor"
                                d="M6 21v-3H3v-2h5v5zm10 0v-5h5v2h-3v3zM3 8V6h3V3h2v5zm13 0V3h2v3h3v2z" />
                        </svg>`,
    nonscreenfull: `<svg  xmlns="http://www.w3.org/2000/svg" width="28" height="24"
                            viewBox="0 0 24 24">
                            <path fill="currentColor"
                                d="M5 19h2q.425 0 .713.288T8 20t-.288.713T7 21H4q-.425 0-.712-.288T3 20v-3q0-.425.288-.712T4 16t.713.288T5 17zm14 0v-2q0-.425.288-.712T20 16t.713.288T21 17v3q0 .425-.288.713T20 21h-3q-.425 0-.712-.288T16 20t.288-.712T17 19zM5 5v2q0 .425-.288.713T4 8t-.712-.288T3 7V4q0-.425.288-.712T4 3h3q.425 0 .713.288T8 4t-.288.713T7 5zm14 0h-2q-.425 0-.712-.288T16 4t.288-.712T17 3h3q.425 0 .713.288T21 4v3q0 .425-.288.713T20 8t-.712-.288T19 7z" />
                        </svg>`,
    publish: `<svg xmlns="http://www.w3.org/2000/svg" width="28" height="24" viewBox="0 0 448 512">
                                <path fill="currentColor"
                                    d="M48 32C21.5 32 0 53.5 0 80v352c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V80c0-26.5-21.5-48-48-48zm69.564 64s49.092 11.125 46.596 94.781c0 0 41.47-117.171 204.567 1.649c0 42.788-.315 172.242-.315 223.57c-176.897-149.88-207.385-22.068-207.385-22.068c0-79.856-81.754-70.34-81.754-70.34v-212.65s18.756 1.402 38.291 11.11zm86.147 98.283l-24.002 141.35h36.562l11.815-81.38h.373l32.447 81.38h14.633l33.94-81.38h.373l10.314 81.38h36.783l-21.402-141.35h-36.563l-30.388 75.541l-28.696-75.54z" />
                            </svg>`,
    republish: `<svg xmlns="http://www.w3.org/2000/svg" width="28" height="24" viewBox="0 0 24 24">
                                <path fill="currentColor"
                                    d="M5.3 18.025q-1.075-1.2-1.687-2.75T3 12q0-3.75 2.625-6.375T12 3V1l5 3.75l-5 3.75v-2q-2.275 0-3.887 1.613T6.5 12q0 1.15.438 2.15t1.187 1.75zM12 23l-5-3.75l5-3.75v2q2.275 0 3.888-1.612T17.5 12q0-1.15-.437-2.15T15.875 8.1L18.7 5.975q1.075 1.2 1.688 2.75T21 12q0 3.75-2.625 6.375T12 21z" />
                            </svg>`,
    p: ` <svg xmlns="http://www.w3.org/2000/svg" width="28" height="24" viewBox="0 0 448 512">
                                <path fill="currentColor"
                                    d="M48 32C21.5 32 0 53.5 0 80v352c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V80c0-26.5-21.5-48-48-48zm137.371 64.012c1.358.141 2.211 1.495 3.09 2.44c1.96 8.586 2.478 17.438 4.15 26.091c3.49-4.01 7.262-7.78 11.51-11c19.77-15.215 46.636-21.572 70.875-14.87c16.13 4.422 29.656 15.396 39.899 28.33c4.297 5.592 8.144 11.6 10.828 18.147h-.002c4.841 11.511 6.324 24.116 6.384 36.512c.313 17.991-2.767 36.138-9.757 52.762c-8.826 21.21-24.453 39.866-44.815 50.8c-16.163 8.867-35.043 12.49-53.363 10.73c-10.547-.931-21.062-3.203-30.744-7.567c.083 23.398.437 46.79.693 70.181c.387 10.523-.38 21.186 1.695 31.577c.7 2.774 1.608 5.937 4.21 7.517c2.609 1.457 5.721 1.037 8.585 1.111c4.924.051 9.848-.172 14.772.082c1.564 0 3.4.857 3.433 2.66c.272 4.06.322 8.185-.033 12.253c-.395 2.263-3.211 2.24-4.998 2.23c-22.75-1.374-45.556-1.776-68.345-1.332c-11.922.14-23.837 1.004-35.758 1.316c-.585-.716-1.721-1.21-1.713-2.255c-.172-3.812-.05-7.624-.067-11.428c-.106-1.432.494-3.287 2.2-3.352c6.38-.568 12.827.165 19.216-.328c4.266-.773 6.504-5.138 7.196-9.04c1.343-8.292.8-16.722 1.228-25.079c.025-66.148 0-132.304.016-198.453c-.008-1.819-.068-3.63-.24-5.434c-.388-5.45-2.65-10.868-6.932-14.392c-4.767-4.11-10.623-6.62-16.057-9.674c-2.068-1.26-4.611-2.33-5.632-4.668c-.32-2.38-.346-4.841.025-7.213c1.136-1.77 3.36-2.207 5.139-3.055c16.845-7.318 33.642-14.761 50.496-22.09c3.912-1.597 7.904-3.407 12.203-3.49c.216-.034.42-.04.613-.02m47.938 26.629a39.937 39.937 0 0 0-6.924.404c-12.886 1.77-25.237 8.66-32.836 19.314c-.288 33.667-.023 67.36-.131 101.036c-.108 7.73 2.002 15.956 7.674 21.505c6.63 5.723 14.49 10.176 23.152 11.89c11.156 2.212 23.499 2.912 33.774-2.81c12.178-6.52 19.531-19.298 23.162-32.234c5.772-20.79 4.617-42.863.484-63.842c-3.459-15.965-9.352-32.276-21.291-43.91c-7.159-7.084-17.046-11.07-27.064-11.353" />
                            </svg>`,
    unpublish: `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="24" viewBox="0 0 24 24">
                                <path fill="currentColor"
                                    d="M11 8.17L6.49 3.66A9.91 9.91 0 0 1 12 2c5.52 0 10 4.48 10 10c0 2.04-.61 3.93-1.66 5.51l-1.46-1.46A7.842 7.842 0 0 0 20 12c0-3.35-2.07-6.22-5-7.41V5c0 1.1-.9 2-2 2h-2zm10.19 13.02l-1.41 1.41l-2.27-2.27A9.839 9.839 0 0 1 12 22C6.48 22 2 17.52 2 12c0-2.04.61-3.93 1.66-5.51L1.39 4.22L2.8 2.81zM11 18c-1.1 0-2-.9-2-2v-1l-4.79-4.79C4.08 10.79 4 11.38 4 12c0 4.08 3.05 7.44 7 7.93z" />
                            </svg>`,
    divider: ` <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 16 16">
                            <path fill="currentColor" d="M7.5 3a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-1 0v-9a.5.5 0 0 1 .5-.5" />
                        </svg>`
} as any;

export default {
    props: ['icon', 'tips'],   // current scroll area, only: 'preview', 'editor'
    emits: ['change'],
    name: "ToolBarIcon",
    data() {
        return {
            iconSVG: ICONS[this.icon] as string,
        }
    },
    watch: {
        icon(newV: string, oldV: string) {
            this.iconSVG = ICONS[newV]
        }
    }
}
</script>