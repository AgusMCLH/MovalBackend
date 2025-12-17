// ============================================
// SOLUCIÓN CON jsPDF - Sin problemas de fuentes
// ============================================

import { jsPDF } from 'jspdf';

export function generateCampersPDF(campers) {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  let yPosition = 20;
  const pageHeight = doc.internal.pageSize.height;
  const margin = 20;
  const lineHeight = 6;

  // Función para verificar si necesitamos nueva página
  const checkNewPage = (neededSpace = 10) => {
    if (yPosition + neededSpace > pageHeight - 20) {
      doc.addPage();
      yPosition = 20;
      return true;
    }
    return false;
  };
  const pageWidth = doc.internal.pageSize.getWidth();

  /* -----------------------------
  LOGO
  (reemplazar con tu base64)
  ----------------------------- */
  const logoBase64 =
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASwAAAEsCAYAAAB5fY51AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAABgWSURBVHgB7d1PjBzHdcfxV8OlIEcStEouNqXYY4TKyQLXkSjTBpFtXyIFMcAVpAMJBNilEQcGGICzvsg5JFpCFwdGwuEhgG4iT3FOooAAsU8aHRxvSDlaIhcjcZAWEEk+JUvEQRKJ3HJVdw93dnZmtqen/1RVfz/A/qOWFCRyfnz1+lWVEmBM1DvTFbm/LLJnPmrzsdMVpZZFyeMi5qO2Pybd/Z9hv1bLs39VvWu+Zzf7Yjd7Mz8ksWi5a35N8/VenH6PfVuKB/3tWIARStBKaSh9Eok69rj5U7CSBZH5OBpEToiTNxtse/oDE3w7JkBNmN3eEbQOgRW4qLdiKp9jJpg6X0iCSUsk7oVSUTum8jNBtnfHfD4Qubcz6O/sCoJFYAUkDaelFfMiPmXeIkcrpqqZakztmP/2gXm7M+i/NxAEg8Dy2EhArZkvT9kfEkwyMG93TIDdpArzG4Hlmah32gSUrJpPTUjplaOb3ZhgYN5umuXxu/TC/EJgOe5gFaXXCajS2Yb+wDT0b7B8dB+B5aAHIdVR62YZs0ZI1UXvmr8Ybpom/tuD/k9vCpxDYDkk6j0XEVKuGIYXlZdLCKyGJSHFcs912bLx0yumYR8LGkNgNSBZ8qnjJqBs45wne54xTXrVF/3J2zxtrB+BVSOqqZAMl4xUXXUisGqQBdVrQjUVqoHovWs06qtHYFVkZNm3Yd5WBG0Qm5fU1uDqrRuCShBYJUuCqvPQZfM3bo9lX2vFNrhMn+tdlovlIrBKQlBhAruv8brsfXKD4CoHgbUgggo5DIPrGk8WF0NgFURQoYCYHtdiCKwCot7za6L0VWnf0S0oR0xwFUNgzYHxBJQsFv3p1+lv5Udg5ZCNKPTNp+sClE3JdQZQ8zkmmCn6zvOmolI/MG9nBKjGiqhjG92vPfVw/JMP3xVMRYU1Rbb8s30qhj5RJ5aJMxBYY9Knf8dfEy09AZqipG+WidcIroNYEo5Iq6pjf28+fVGAZp0xfxbXul99ajfe/vCOIEGFJVRVcBxN+QdaH1hZr+pNYaYKbjO9LX2x7aeftjawqKrgJaW2Bn9164q0VCsDy4RVV9Txt4QngPBTa58kdqRlos3Tl0UtvS+EFfxl/8J9P+p9pXWrg9ZUWCwBEaR0/OFKW06BaEVgZUvAd4TGOsLUmiVi8EvC9GSFZAnYFSBM2RLx2TUJXNCDo1HvuddMDfmGKSQfFiBsD5sniOe7X3tKQt6PGOSSMOtXXTX9qg0B2iYdNN0Msa8VXGAxsgAkguxrBRVYNNeBA4ILrWCa7ukWG5rrwIisGW9eG4EIoukebT6/bmrFmzTXgUNsM36je+Y378bbH26L57wPrOxJYF8ATKf0iyE8QfQ6sNKwUlsCII/I99DyNrAIK6AQr0PLy8AirICFeBta3gVW9J3Tb5oFORuYgcWY0HpyOf7JRz8Sj3gVWCas7PT6twVAGc6Y0Oqa0HpbPOFNYCXLQFHfFQBlWvFpeehFYNGzAirlTU/L+cAirIBaeBFaTgcWYQXUyvnQcjaw0rPX1fcEQJ2i7lefil29vNXJ0xqyuwLfEQDN0PrrLt6B6FxgpUfE2FMX1LIAaMqu6E+/7NrRNE4dL7N/nhVhBTRs2b4Wk9ekQ5ypsJJjjdVxzrMC3LKTHQLoxHHL7lRY9s5AwgpwzUpyP4IjnHhKyBQ74DRnpuEbXxKm9wbqtwSA2/TeS4P+T29KgxoNLJ4IAl5p/MlhYz2srMnOE0GPffaJz8nJJ5/O/f0nn/zt5OfAW8Mnh429ZptrutNk9976C9+SRx9+LPf3P/qZx+TVC38u8Fo3e+02opHASrbdaOEQPo+9cPoP5MXnvyHzWjn5rKz81u8IPGZeu1HvK428fmsPrHQQTW8JvGWrqo0X/liKevXCa0m1BY+pvdeaGCqtv8Kib+W9l1fPy2d/vXgvyv7c9d/7I4HXbD/rrbr7WbUGVjpvRd/KZ7ZpvmF6V4t6ZfWCnDyRv2EPJ63U3c+qLbCyExi2BF67eukNKculte8IPJf0s8xruya1BFY6b6XeFHjNNtoXWQqOsw34l3/3vMBz5rVd19KwngpLHd8SloJeS5eCxRvt09jlJQ1479U26lB5YEW90xvmw7rAa3bmqszqasiG1aVzmwLP1bQ0rDSw0qWgNDZkhnKcfWa10MxVXvbXZjYrADUsDautsDrHLwtLQe9dOld9c5zZrCBUvjSsLLCS6oppdu9VtRQcZ/8dNOADUPHSsLoKKxkQhc/KmrnK6xUTWGyODoBSlR34V0lgMSAahro3KrM5Ohgr0ebzW1KB0gMra7SzFPScnbmyc1J1s//OF05X1+BHXfTlKhrw5VdYycwVewV9VtXMVV5/srZJA95/y1WcBV9qYGW7t5m58lxdjfZpbFixOToAWjbKbsCXW2HRaPeePRW0ypmrvOzmaGazAqBUqWMOpQVWNtHeFXjt9YvfF1ewOToIUdR7dk1KUl6FxUS795peCo6z1d56jWMVqIjqXC2rAV9KYFFd+a/umau8mM0KQlfUQ6VMDiwcWOntN1RXvnO1kmE2KxTljDmUUGEtsV/Qc0UvlKiLnc06+6VVgdeWy6iyFgqs7GC+DYG3mp65yss24JnN8t3iVdaCFdaSnbnqCrz18uoFpxrt03BxRRAWrrIKBxbVlf9sdfWKRyckMJsVgsWqrAUqrOORUF15rcwLJerCmIP3FqqyigcWTwa9Zs+e8mEpOI6LK0JQvMoqFFjMXfktXQpeEF/ZeTFms7xmwmppQwooVmFRXXnNtYn2eSUXV6xxcYXXlCp0SMLcgZXtC+oKvOT6zFVeZ5+JaMD7baXISQ7zV1hKXRZ4y4eZq7y4uMJzBU5ymCuw0vOuVCTwku9LwXFcXOG9aN4qa74KK73BGR5ydXPzomjAe06puY6eyR1Y2WPIcwIvvf5Nd865Khubo722Ps+IwxwV1nGbhJzV7iHbaLdnS4WK2SyvzTXikD+wlNBs95Avm5sXZZeGNOA9pVTulVuuwMoul1gReCe0Rvs0XFzhtdzN93wVFs12L9mlUggzV3mxOdpjOZvveZeEnJ7moVfPt68ZbWez4KVck+9HBlZWqnUFXmnLUnBccm4WJzr4aDnPsvDoCoszr7wT6sxVXlxc4auj9xfmWRIye+WZtm8M5uIKTylZO2oma2ZgZRudmb3yiJ25shuD246LK7xkZ7JmTiPMrrBUp7QbW1G9tsxc5WWrLGazfDN7WXjUkpDloEfa2mifhtksDx2xLJwaWFnHnuWgJ2x11aaZq7yYzfLOzGXh9AqLp4Ne8fFCibrYOw3hkRlDpLOWhHQsPcFScDa78ZvN0V6Z2seaGFhR77QtyboC5/l2t2BTODfLK8tZBh0ypcLSkcAL65xSkAuzWb6ZnEGTA0vxdNAHoVwoURc7m0UD3hNTjpw5FFjpI0XObXfdow8/xsxVAVxc4Y2VSeMNEyqsJc698sDLq37e3Ny0ZHM0s1k+mDjeMCGwNNPtjmv75uZF2dmskyeeFjhuwnhDZ8I3nRI4jZmrxTGb5YVDWTShwqJ/5TLbaGcpuDgurvBCNN7HOhBYRa6ORn3Y3FwuLq7wwcE+1niFRcPdYUy0l8uG1aVz7T47zAMzAqvDdhxXnX1mlZmrCtj/p8xmuawTHfjqwD/TigrLUZfO0SSuCrNZDlP6QOP9QWBlza2uwDksBatl/9/SgHdWN+qd6Q6/GKmwGBh1ETNX9eDiCoepew+qrNElYSRwDht268HmaIdp+eLw0/3A6ggDo46xM1d2Xgj1YDbLVWpChaVVV+AMZq6awWyWg9T+6m90SUgPyyE02pvBxRVO6g4/SQJr2ul+aIY90peZq+ZwcYV7hk8KswprrytwxusXvy9oFpujXfNJZN8vpV8wMOoKuyT5i7+5Ir74+Uf/mv97P/wX2fzrb4sv7O/FL//3vwUu6CSboIeB1RU4wb5Adv7tnyREIf+3oWrpk8J0Saj0FwQAnKWesO+zHpbqCgC4KttTOBxr6AoAuKtr36nkcaG6/+8CAC7Tx75oKqx7XQEA591fNoGllwUAXGceDhJYAPyg954wgdXpCgA4r9OlwgLgB6WWl4Yj76iP3Vh7KpBzrn50++/kF//5ca7vtUfmvBDIpu4f//Ngrm1JKIGWx5fSKXclqI+99CCUo2Pu/Pyn+QPrN04Ec9zzi6e/Id/6yz9kr2Gt1BMdQa045yoMXFzRAKUfN4GlWBLWhAslwmJ/L0+eeFpQG9t0FwKrJq9/k3OuQsO5WfViSVgTe6GEPUkUYeHiinpRYdWACyXCxsUVtVkmsGpAoz1sXFxRm2WWhBWzSwYulAgfF1fUg8Cq2KvnuU24Lex8HUvDahFYFWIp2C7MZlWPwKoIM1ft9IoJLPt7j2oQWBW5tLYpaB+7JHz1Am2AqhBYFbAzV2efiQTtZB+0nP3SqqB8BFbJmLmCZassGvDls4G1KygNjXZYzGZVYpfAKpGtrpi5whCzWaXbZUlYoquX3hBgFJujy0VglYSlICaxG96ZzSqNrbB0LFiIXQq+wh9KTGHn8ZjNKoUJLEUPa1Hr7NbHDMxmlacje+quoDA7c0WjHUexs1k04BekJTZLwj0qrIIeffgxZq6QG5ujF6Tkrj3TncAq6OXV8zTakZv9s8Js1gK0tk33vVgwNzY3owg7m8XFFUXtxVRYBTFzhaKYzSpIdf7LBFYnFszFNtpZCqIoLq4oSCc9rGNUWHNgczPKwMUVRSzFnUF/OxbkxkQ7ypDMZp3/M0F+NquGW3NiwZHOPrPKzBVKY89MYzYrt9i+SwNL6R3BkS6do1mKcjGblVts36WBxbT7kVgKogpcXJGTHg0socKahZkrVImLK/LQH9j3WWCxPWcWNq6iSmyOzkHJ+/ZDFlgPDQQT2ZkrOzcDVInZrCNotV9hMdowGTNXqBOzWdMN+reTttXoiaOx4AAa7agTF1dM9aDHvh9YWt4VPGCPtmXmCnXj4ooJsuWgNVJh8aRw1OsXvy9AE9gcPW5vQoXF2e4PsBREk2x1v84YzajB8JORwLo/EDBzBScwmzXq3uEKa9DfsbNYsbQcf7PBBcxmPRBn2ZQ4eC9hy/cUcqEEXGJns85+aVVaTas7o18eDKy99j4pZOYKLrIN+HbPZu0NRr8av/m5tRXWy+ZxMo12uIaLKw5m0lhg3WtlYHFzM1zW5tmsQf+9wejXnYP/0Da39EBahgsl4LqWPgwajP9A59C3aH1HWsRuOGUpCNe1dHP0oSw6HFiibkpLpEvBCwL4wM4Htmo2S+tDWTQhsJI+VivOx2KiHT6xTwsvrW1KexzuqR8KrKyPFXzznZkr+KhFF1cMRgdGhzoTv1XL2xI4Zq7gq1ZcXKH1xAyaHFiiBhIwloLwWTsurpicQRMDKzvdL8g+FpubEQL7Z/jkiaclUPHwhNFxnak/Re/dkAC9/k3OuUIYgj03Sx+evxqaHlgBjjfYRrs9awgIQbizWXpqsTQjsMIab2BzM0IU4MUVu+PbcUZNDazkkWJATwtptCNEwV1coWXmyq4js3/2dQmALZ2ZuUKogtocrfQigRXGsvDV85zciLAFMpu1O7j63sxV3czACmFZyFIQbRDEbNYRy0GrI0fyd1nIzBXaxP+LK/SRo1RHBlbWsfdyWdiujaJoO88vrohnPR0cylFhiZdDpHbmym4UBdrE24srZgyLjsoXWJ4NkTJzhTazVZZ/DfhjV/J8V67ASks1f45OptGONvNwNmtn0N+O83xjzgpLvDlyxlZXzFyh7fyazVL9vN+ZP7Dk3nXxoPnOhRJAypPN0buiP8ldDOUOrHQmy+3mO0tBYJ/d6O/8bJaWm5NOFp1mjgrLcrf5zt2CwGHuX1yRr9k+NFdgudx8Xw9v1zqwMMdnswZ5m+1DSuYU9Z6LRKl3BAAWoteO2js4bu7AsqLN0++bDysCAMXEg6u3vyhzmrOHldE6yOOTAdRFbUkBxQLLkxEHAE4y1dWtQkVPocBKRxz0NQGAuRWrrqyCFZZ1z06nUmUBmEcsuvOuFFQ4sKiyAMxP3Zh3lGHUAhWWRZUFIDdbXV2XBSwUWFRZAPJbrLqyFqywLKosAEcy1dWv5T6VYZpjsqB4+xf/1z1z4jOiVCQAMJHqDfo//kdZUAkVlpVUWbEAwGGF567GlRJY2dEz3PgAYILic1eHfiUpUbT53Dvml4wEAFKF9gxOU9KSMKNlrrNtAAROH/u6lKjUwMruFWNjNABbwFxfdIxhXLkVlqU/7QljDkDL6d15TxPNo/TAYpgUgImWa2VXV1apTfdRHPIHtFapjfZR5S8Jh7RmzAFoo5Ib7aMWnnSfJt7+KO6e+dwTotQZAdAWZil46wdSkeoqrMT9LWECHmiL2FRXC+8XnKXSwMoa8BcFQAuorSoa7aMqWxIOsTQEWiCZubpd+eB4xUvCIZaGQMDiKmauJqklsFgaAgEzr+2ql4JDlS8Jh1gaAiFSV8xS8LrUpKYl4VCyNNwRACGw51xtSY1qDax0aXjsJWGvIeA5vVvlgOg0tS0Jh+Lt/9jtnjnx/2Zp+KIA8JOWPx30b/1QalZ7YFmmn7VNPwvw1rVB/70taUDNPaxRjDoAHopFP7IlDWkssLJ+ll0D088CvJD2rQb9QWOv2QYrLBta2yat95jPAnygO7XNW03TSA9rVLz98c9ME15xryHgMjtvdesNaVjjgWWZJvyg+9Un7YFfHPgHuCbdJ+jE+XaNLgkPSM+CZ6gUcEss8ogzh3E6E1gjQ6WxAHBB3HSTfVxlZ7oXFfXOdEXdt+fBLwuAhtgngktfbrrJPs6dJWEmfXKoXxIAzdHykmthZTkXWFZyIasWxh2AJmi9mV2K7BwnnhJOYp4c7jDuANQtOS7me+IoZwPLSsYdCC2gJiasaj4uZl5OB5ZFaAF1cD+sLOcDyyK0gCr5EVaWF4FlMQ0PVOLa4Ort74onvAksy4TWTc7RAkpzw4TVt8UjXgWWFW9//EOWh8Ci7DLwdk88411gWfS0gEX407Ma52VgWYQWUIS/YWV5G1gWoQXMw++wsrwOLCsLrbvcwgPMoOXioH+7L55z7rSGoqLec5EJrbeEUx6AEfbUBbuR2c29gfMKJrCs7Giad8ynXQGQnWfl3qkLRTl5WkNR6dE0yU08sQDtthNaWFlBBZaVhtanXzaf3hCgnW6IfiS4sLKCWhKOM32tLdPXek2A1vD/SeAsQQeWFfWeXRPVeVNoxiNotrlu7w28dVMCFnxgWTTjEbjgmuvTBNfDmuRBX0vvXRMgLNdMv8q5yyKq0ooKa5Tpa/WyvhZLRHgsma+6Mui/5/0w6DxaF1gWS0R4zo4sOHmrTdVaGVhDPEWEh+wScMuly03r1OrAsrItPfYpYlcAd9n7Oi+GssWmKO83Py8q3v4o7p75/Nui9BPC8ctwk62qLgz6//AzabnWV1ijot7pDfN/xC4RuwI0j6pqTOsrrFHp5a2m2pL7inPj0TCqqgmosKbgSSIasuPyVfFNI7COkD1JvCzMbaFSyVzVNRNUW4KpWBIeIT3R9PN/S1MeldFyXeTR3zfLvx8KZqLCmgPLRJRK64F5f4XlX34EVgE8TcSCzNM/tRn6yQpVILAWQHBhPmmfyiz/+m2dVF8UgbWgqLdimvFLdkP1uhBcmIigKguBVZKkvyX3Nggu7COoykZglSwNrvsRS8U2I6iqQmBViB5X68TmrS/6kRsEVTUIrBok58qLumyWi5EgPIwn1IbAqlE2x7Vl/oSfM//rmZz3mln2ibphwuomQVUfAqsBUS8yYfU/purStupiet4ntppS6ibLvmYQWA3br7pkVeh1OYpqyhUElkOy0083WDK6wD7pM5WU6BuElDsILEdlF8CuEV512g8pkUd3WPK5h8DywH7lxbKxfPvLPULKfQSWZ6Le6RXzu7ZqXmBrjEkUkQx17qSNc3l30L+9I/AGgeWx9GnjL02AqTUTYKcIsCnSJ3t3qKL8R2AFJls+njIvzigbmehKu9iLG2wFNTAf7xBQYSGwAvegCjOfmrdTYgMsnNkvE05iqid7DvreByLHd9p4G3KbEFgtlfTCZK9r/giYj+oLZt1kg8x87VxFllZMonbTYLp/V+ShAcHUTgQWDsmOyjFvejl969gwWzbVzONJsKWWkx9L2O85avQieRq3vzTTOjbvd7Mgumu+Np/vxen3dMzHY7uEEsb9CiFi8BAV9PpYAAAAAElFTkSuQmCC'; // TU LOGO

  const logoWidth = 80;
  const logoHeight = 80;

  const logoX = (pageWidth - logoWidth) / 2;
  const logoY = (pageHeight - logoHeight) / 2;

  doc.addImage(logoBase64, 'PNG', logoX, logoY, logoWidth, logoHeight);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(22);

  const titulo = 'Campamentistas Moval - 2026';
  doc.text(titulo, pageWidth / 2, 200, { align: 'center' });

  doc.addPage(); // Nueva página para el contenido

  // TÍTULO PRINCIPAL
  doc.setFontSize(22);
  doc.setFont('helvetica', 'bold');
  doc.text('Lista de Campamentistas', 105, yPosition, { align: 'center' });
  yPosition += 10;

  // SUBTÍTULOS
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.text(`Total de campamentistas: ${campers.length}`, 105, yPosition, {
    align: 'center',
  });
  yPosition += 5;
  doc.text(
    `Fecha de generación: ${new Date().toLocaleDateString('es-ES')}`,
    105,
    yPosition,
    { align: 'center' }
  );
  yPosition += 15;

  // ITERAR SOBRE CADA CAMPAMENTISTA
  campers.forEach((camper, index) => {
    checkNewPage(50); // Verificar espacio suficiente

    // Nombre del campamentista
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(64, 113, 53);
    doc.text(`${index + 1}. ${camper.name}`, margin, yPosition);
    yPosition += 8;

    // Información Personal - Título
    doc.setFontSize(11);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(78, 120, 68);
    doc.text('Información Personal:', margin, yPosition);
    yPosition += 6;

    // Información Personal - Datos
    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(0, 0, 0);

    const personalInfo = [
      `• Edad: ${camper.age} años`,
      `• DNI: ${camper.dni}`,
      `• Dirección: ${camper.direction}`,
      `• Teléfono: ${camper.telephone || 'No proporcionado'}`,
      `• Teléfono de padres: ${camper.parentsCellphone}`,
    ];

    personalInfo.forEach((line) => {
      checkNewPage(lineHeight);
      doc.text(line, margin + 5, yPosition);
      yPosition += lineHeight;
    });

    yPosition += 3;
    checkNewPage(30);

    // Información Médica - Título
    doc.setFontSize(11);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(78, 120, 68);
    doc.text('Información Médica:', margin, yPosition);
    yPosition += 6;

    // Información Médica - Datos
    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(0, 0, 0);

    const medicalInfo = [
      `• Hospital: ${camper.hospital}`,
      `• Tratamiento: ${camper.treatment}`,
      `• Contraindicaciones: ${camper.contraindications}`,
      `• Emergencia médica: ${camper.medicalEmergency}`,
      `• Enfermedad: ${camper.illness}`,
      `• Enfermedades susceptibles: ${
        camper.susceptibleIllness?.join(', ') || 'Ninguna'
      }`,
      `• Medicamentos:`,
      ...camper.medications.map((med) => `   - ${med}`),
    ];

    medicalInfo.forEach((line) => {
      checkNewPage(lineHeight);
      doc.text(line, margin + 5, yPosition);
      yPosition += lineHeight;
    });

    // Línea separadora
    yPosition += 4;
    checkNewPage(5);
    doc.setDrawColor(189, 195, 199);
    doc.setLineWidth(0.5);
    doc.line(margin, yPosition, 190, yPosition);
    yPosition += 8;
  });

  // Retornar como ArrayBuffer
  return doc.output('arraybuffer');
}

// Versión alternativa con tabla
export function generateCampersPDFTable(campers) {
  const doc = new jsPDF({
    orientation: 'landscape',
    unit: 'mm',
    format: 'a4',
  });

  // Título
  doc.setFontSize(18);
  doc.setFont('helvetica', 'bold');
  doc.text('Lista de Campamentistas', 148, 15, { align: 'center' });

  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.text(
    `Total: ${campers.length} | Fecha: ${new Date().toLocaleDateString(
      'es-ES'
    )}`,
    148,
    22,
    { align: 'center' }
  );

  // Crear datos de la tabla
  let yPos = 30;
  const rowHeight = 10;
  const colWidths = [40, 15, 25, 60, 50];
  const headers = ['Nombre', 'Edad', 'DNI', 'Hospital', 'Tratamiento'];

  // Dibujar encabezados
  doc.setFillColor(52, 152, 219);
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.rect(
    10,
    yPos,
    colWidths.reduce((a, b) => a + b, 0),
    rowHeight,
    'F'
  );

  let xPos = 10;
  headers.forEach((header, i) => {
    doc.text(header, xPos + 2, yPos + 6);
    xPos += colWidths[i];
  });

  yPos += rowHeight;
  doc.setTextColor(0, 0, 0);
  doc.setFont('helvetica', 'normal');

  // Dibujar filas
  campers.forEach((camper, index) => {
    if (yPos > 180) {
      doc.addPage();
      yPos = 20;
    }

    // Alternar color de fondo
    if (index % 2 === 0) {
      doc.setFillColor(236, 240, 241);
      doc.rect(
        10,
        yPos,
        colWidths.reduce((a, b) => a + b, 0),
        rowHeight,
        'F'
      );
    }

    xPos = 10;
    const rowData = [
      camper.name.substring(0, 25),
      String(camper.age),
      String(camper.dni),
      camper.hospital.substring(0, 35),
      camper.treatment.substring(0, 30),
    ];

    rowData.forEach((data, i) => {
      doc.text(data, xPos + 2, yPos + 6);
      xPos += colWidths[i];
    });

    yPos += rowHeight;
  });

  return doc.output('arraybuffer');
}
