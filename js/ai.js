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

    tools.forEach(({id, image, name, published_in, features }) => {
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
                    <div onclick="openModal('${id}')" class="w-12 h-12 bg-[#FEF7F7] rounded-full flex justify-center items-center cursor-pointer">
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

const openModal = async (id) => {
    try {
        const response = await fetch(`https://openapi.programming-hero.com/api/ai/tool/${id}`) 
        const jsonData = await response.json();
        const data = jsonData.data;
        console.log(data)
        displayModal(data);
    } catch (error) {
        console.error('Modal open error', error);
    }
} 

const displayModal = (data) => {
    const myModal = document.getElementById('my_modal_5');
    const imageUrl = data.image || 'assets/no-photo.avif';

    myModal.innerHTML = `
                <div class="modal-box">
                <div class="space-y-12">
                    <div class=" bg-[#fef6f6] p-8 rounded-2xl border border-red-500">
                        <h2 class="text-2xl font-semibold">
                            ${data.description || 'No description available'}
                        </h2>
                        <!-- cards -->
                        <div class="flex flex-col md:flex-row justify-between items-center mt-6 gap-10 md:gap-0">
                            <div class="bg-white rounded-2xl flex justify-center items-center w-11/12 md:w-[30%]">
                                <h2 class="text-base font-bold text-[#03A30A] p-5 text-center">
                                    $10/ <br> month <br> Basic
                                </h2>
                            </div>
                            <div class="bg-white rounded-2xl flex justify-center items-center w-11/12 md:w-[30%]">
                                <h2 class="text-base font-bold text-[#F28927] p-5 text-center">
                                    $50/ <br> month <br> Pro
                                </h2>
                            </div>
                            <div class="bg-white rounded-2xl flex justify-center items-center w-11/12 md:w-[30%]">
                                <h2 class="text-base font-bold text-[#EB5757] p-5 text-center">
                                    Contact <br> us <br> Enterprise
                                </h2>
                            </div>
                        </div>

                        <!-- features and integrations -->
                        <!-- features and integrations -->
                        <div class="flex flex-col md:flex-row justify-between items-center mt-6 mb-11 gap-6 md:gap-0">
                            <!-- features -->
                            <div class="w-full md:w-auto">
                                <h2 class="text-2xl font-semibold">Features</h2>
                                <ul class="text-[#585858] list-disc pl-4 mt-2">
                                    <li>Customizable responses</li>
                                    <li>Multilingual support</li>
                                    <li>Seamless integration</li>
                                </ul>
                            </div>
                            <!-- integrations -->
                            <div class="w-full md:w-auto">
                                <h2 class="text-2xl font-semibold">Integrations</h2>
                                <ul class="text-[#585858] list-disc pl-4 mt-2">
                                    <li>FB Messenger</li>
                                    <li>Slack</li>
                                    <li>Telegram</li>
                                </ul>
                            </div>
                        </div>

                    </div>

                    <div class="p-8 rounded-2xl border border-[#e7e7e7]">
                        <!-- image -->
                        <div>
<img src="${imageUrl}" alt="${data.name}" class="w-full max-w-md rounded-lg">
                        </div>
                        <!-- content -->
                        <div class="mt-4">
                            <h2 class="text-2xl font-semibold text-center">Hi, how are you doing today?</h2>
                            <p class="text-[#585858] text-center mt-2">I'm doing well, thank you for asking. How can I
                                assist you today?
                            </p>
                        </div>
                    </div>
                </div>

                <div class="modal-action">
                    <form method="dialog">
                        <!-- if there is a button in form, it will close the modal -->
                        <button class="btn bg-red-500 text-white font-bold">Close</button>
                    </form>
                </div>
            </div>
    `

    myModal.showModal();
}

loadData();
