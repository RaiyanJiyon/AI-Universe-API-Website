const loadData = async () => {
    try {
        const response = await fetch('https://openapi.programming-hero.com/api/ai/tools');
        const fetchData = await response.json();
        const tools = fetchData.data.tools;
        displayData(tools);
    } catch (error) {
        console.error("Failed to load data:", error);
    }
}

const displayFeatures = (features) => {
    if (!features || features.length === 0) return '<li>No features available</li>';
    return features.map((feature, index) => `<li>${index + 1}. ${feature}</li>`).join('');
}

const displayData = (tools) => {
    const aiCardContainer = document.getElementById('ai-card-container');
    const fragment = document.createDocumentFragment();

    tools.forEach(({ image, name, published_in, features }) => {
        const aiCard = document.createElement('div');
        aiCard.classList.add('card', 'border', 'border-[#CFCFCF]');

        aiCard.innerHTML = `
            <div class="w-11/12 mx-auto mt-5">
                <figure class="w-full rounded-lg">
                    <img class="w-full h-40 object-cover" src="${image}" alt="AI tool image" onerror="this.onerror=null;this.src='assets/no-photo.avif';" />
                </figure>
            </div>
            <div class="card-body p-0 w-11/12 mx-auto">
                <div class="space-y-4">
                    <h2 class="card-title mt-5">Features</h2>
                    <ol>${displayFeatures(features)}</ol>
                </div>
                <div class="divider text-[#1313131A]"></div>
                <div class="flex justify-between items-center">
                    <div>
                        <h2 class="card-title">${name || "Not available"}</h2>
                        <div class="flex items-center gap-1 mt-2 pb-5">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                stroke="currentColor" class="size-6">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                    d="M6.75 2.994v2.25m10.5-2.25v2.25m-14.252 13.5V7.491a2.25 2.25 0 0 1 2.25-2.25h13.5a2.25 2.25 0 0 1 2.25 2.25v11.251m-18 0a2.25 2.25 0 0 0 2.25 2.25h13.5a2.25 2.25 0 0 0 2.25-2.25m-18 0v-7.5a2.25 2.25 0 0 1 2.25-2.25h13.5a2.25 2.25 0 0 1 2.25 2.25v7.5m-6.75-6h2.25m-9 2.25h4.5m.002-2.25h.005v.006H12v-.006Zm-.001 4.5h.006v.006h-.006v-.005Zm-2.25.001h.005v.006H9.75v-.006Zm-2.25 0h.005v.005h-.006v-.005Zm6.75-2.247h.005v.005h-.005v-.005Zm0 2.247h.006v.006h-.006v-.006Zm2.25-2.248h.006V15H16.5v-.005Z" />
                            </svg>
                            <p class="text-[#585858] font-medium">${published_in || 'Not available'}</p>
                        </div>
                    </div>
                    <div class="w-12 h-12 bg-[#FEF7F7] rounded-full flex justify-center items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6 text-red-500">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                        </svg>
                    </div>
                </div>
            </div>
        `;
        fragment.appendChild(aiCard);
    });

    aiCardContainer.appendChild(fragment);
}

loadData();
