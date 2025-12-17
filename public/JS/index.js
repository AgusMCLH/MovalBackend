function renderTable(data) {
  console.log(data);

  const tbody = document.getElementById('tableBody');
  tbody.innerHTML = '';

  data.forEach(function (camper) {
    const row = document.createElement('tr');
    row.className =
      'table-row border-b border-gray-200 hover:bg-indigo-50 cursor-pointer transition-all';
    row.onclick = function () {
      openModal(camper);
    };

    row.innerHTML =
      '<td class="px-6 py-4">' +
      '<div class="flex items-center">' +
      '<div class="w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold mr-3">' +
      camper.nombre.charAt(0) +
      '</div>' +
      '<span class="font-medium text-gray-800">' +
      camper.nombre +
      '</span>' +
      '</div>' +
      '</td>' +
      '<td class="px-6 py-4 text-gray-700">' +
      camper.edad +
      '    años </td>' +
      '<td class="px-6 py-4 text-gray-700">' +
      camper.cedula +
      '</td>' +
      '<td class="px-6 py-4 text-gray-700">' +
      camper.celularPadres +
      '</td>' +
      '<td class="px-6 py-4 text-center">' +
      '<button class="color-primary text-white px-4 py-2 rounded-lg hover:shadow-lg transition-all font-medium">' +
      'Ver Detalles' +
      '</button>' +
      '</td>';

    tbody.appendChild(row);
  });
}

const generatePDF = () => {
  const token = window.location.href.split('token=')[1]; // Suponiendo que el token está en la URL
  console.log('Token para PDF:', token);
  const pdfUrl = `/api/pdf/generate?token=${token}`;
  window.location.href = location.origin + pdfUrl;
};

/*
            {
                id: {{this.index}},
                nombre: "{{this.name}}",
                edad: {{this.age}},
                direccion: "{{this.direction}}",
                cedula: "{{this.dni}}",
                telefonoFijo: "{{this.telephone}}",
                celularPadres: "{{this.parentsCellphone}}",
                hospital: "{{this.hospital}}",
                emergenciaMedica: "{{this.medicalEmergency}}",
                medicaciones: "{{this.medications}}",
                enfermedad: "{{this.illness}}",

            },

*/

function openModal(camper) {
  const modal = document.getElementById('modal');
  const modalContent = document.getElementById('modalContent');

  const medicationTableHTML = camper.medicaciones
    .map(
      (med) =>
        `<tr>
      <td class="border px-4 py-2">${med.nombre}</td>
      <td class="border px-4 py-2">${med.dosis}</td>
      </tr>`
    )
    .join('');

  modalContent.innerHTML =
    '<div class="space-y-6">' +
    '<div class="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6">' +
    '<h3 class="text-xl font-bold text-gray-800 mb-4 flex items-center">' +
    '<svg class="w-6 h-6 mr-2 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">' +
    '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>' +
    '</svg>' +
    'Información Personal' +
    '</h3>' +
    '<div class="grid md:grid-cols-2 gap-4">' +
    '<div>' +
    '<p class="text-sm text-gray-600 font-medium">Nombre Completo</p>' +
    '<p class="text-gray-800 font-semibold">' +
    camper.nombre +
    '</p>' +
    '</div>' +
    '<div>' +
    '<p class="text-sm text-gray-600 font-medium">Edad</p>' +
    '<p class="text-gray-800 font-semibold">' +
    camper.edad +
    ' años</p>' +
    '</div>' +
    '<div>' +
    '<p class="text-sm text-gray-600 font-medium">Cédula</p>' +
    '<p class="text-gray-800 font-semibold">' +
    camper.cedula +
    '</p>' +
    '</div>' +
    '<div class="md:col-span-2">' +
    '<p class="text-sm text-gray-600 font-medium">Dirección</p>' +
    '<p class="text-gray-800 font-semibold">' +
    camper.direccion +
    '</p>' +
    '</div>' +
    '</div>' +
    '</div>' +
    '<div class="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6">' +
    '<h3 class="text-xl font-bold text-gray-800 mb-4 flex items-center">' +
    '<svg class="w-6 h-6 mr-2 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">' +
    '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>' +
    '</svg>' +
    'Contactos de Emergencia' +
    '</h3>' +
    '<div class="grid md:grid-cols-2 gap-4">' +
    '<div>' +
    '<p class="text-sm text-gray-600 font-medium">Celular Padres</p>' +
    '<p class="text-gray-800 font-semibold">' +
    camper.celularPadres +
    '</p>' +
    '</div>' +
    '<div>' +
    '<p class="text-sm text-gray-600 font-medium">Teléfono Fijo</p>' +
    '<p class="text-gray-800 font-semibold">' +
    camper.telefonoFijo +
    '</p>' +
    '</div>' +
    '</div>' +
    '</div>' +
    '<div class="bg-gradient-to-br from-red-50 to-pink-50 rounded-xl p-6">' +
    '<h3 class="text-xl font-bold text-gray-800 mb-4 flex items-center">' +
    '<svg class="w-6 h-6 mr-2 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">' +
    '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>' +
    '</svg>' +
    'Información Médica' +
    '</h3>' +
    '<div class="space-y-4">' +
    '<div>' +
    '<p class="text-sm text-gray-600 font-medium">Hospital</p>' +
    '<p class="text-gray-800 font-semibold">' +
    camper.hospital +
    '</p>' +
    '</div>' +
    '<div>' +
    '<p class="text-sm text-gray-600 font-medium">Emergencia Médica</p>' +
    '<p class="text-gray-800 font-semibold">' +
    camper.emergenciaMedica +
    '</p>' +
    '</div>' +
    '<div class="bg-white rounded-lg p-4 border-l-4 border-green-500">' +
    '<p class="text-sm text-gray-600 font-medium mb-1">Tratamiento</p>' +
    '<p class="text-gray-800 font-semibold">' +
    camper.treatment +
    '</p>' +
    '</div>' +
    '<div class="bg-white rounded-lg p-4 border-l-4 border-yellow-500">' +
    '<p class="text-sm text-gray-600 font-medium mb-1">Enfermedades</p>' +
    '<p class="text-gray-800 font-semibold">' +
    camper.illness +
    '</p>' +
    '</div>' +
    '<div class="bg-white rounded-lg p-4 border-l-4 border-blue-500">' +
    '<p class="text-sm text-gray-600 font-medium mb-1">Propenso a sufrir</p>' +
    '<p class="text-gray-800 font-semibold">' +
    camper.suceptible +
    '</p>' +
    '</div>' +
    '<div class="bg-white rounded-lg p-4 border-l-4 border-purple-500">' +
    '<p class="text-sm text-gray-600 font-medium mb-1">Medicaciones</p>' +
    '<table class="table-auto w-full">' +
    '<thead>' +
    '<th> Nombre </th>' +
    '<th> Dosis </th>' +
    '</thead>' +
    '<tbody>' +
    medicationTableHTML +
    '</tbody>' +
    '</table>' +
    '</div>' +
    '<div class="bg-white rounded-lg p-4 border-l-4 border-red-500">' +
    '<p class="text-sm text-gray-600 font-medium mb-1">Contraindicaciones</p>' +
    '<p class="text-gray-800 font-semibold">' +
    camper.contraindications +
    '</p>' +
    '</div>' +
    '</div>' +
    '</div>' +
    '</div>';

  modal.classList.remove('hidden');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  const modal = document.getElementById('modal');
  modal.classList.add('hidden');
  document.body.style.overflow = 'auto';
}

document.getElementById('modal').addEventListener('click', function (e) {
  if (e.target === this) {
    closeModal();
  }
});

document.getElementById('searchInput').addEventListener('input', function (e) {
  const searchTerm = e.target.value.toLowerCase();
  const filtered = campamentistas.filter(function (camper) {
    return (
      camper.nombre.toLowerCase().includes(searchTerm) ||
      camper.cedula.includes(searchTerm)
    );
  });
  renderTable(filtered);
});

const orderByAge = function () {
  const sorted = [...campamentistas].sort((a, b) => a.edad - b.edad);
  renderTable(sorted);
};

const orderByName = function () {
  const sorted = [...campamentistas].sort((a, b) =>
    a.nombre.localeCompare(b.nombre)
  );
  renderTable(sorted);
};

renderTable(campamentistas);
