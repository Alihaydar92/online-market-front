import jsPDF from "jspdf";
import fontTxt from "../../helpers/fontRobotoBase64";

export const incomePdf = () => (dispatch) => {
  var callAddFont = function () {
    this.addFileToVFS("Roboto-Regular-normal.ttf", fontTxt);
    this.addFont("Roboto-Regular-normal.ttf", "Roboto-Regular", "normal");
  };
  jsPDF.API.events.push(["addFonts", callAddFont]);
  const pdf = new jsPDF("p", "mm", "a4");

  pdf.setFont("Roboto-Regular");
  //basliq
  pdf.setFontSize(16);
  pdf.text("KASSA MƏDAXİL ORDERİNİN QƏBZİ", 60, 20);

  //tarix ucun yer
  pdf.setFontSize(12);
  pdf.text("''___''____________ 20___-ci il", 80, 50);

  //linelar
  pdf.line(15, 80, 195, 80); //line 1
  pdf.line(15, 95, 195, 95); //line 2
  pdf.line(15, 115, 195, 115); //line 3
  pdf.line(15, 130, 195, 130); //line 4
  pdf.line(15, 150, 195, 150); //line 5
  pdf.line(15, 165, 195, 165); //line 6
  pdf.line(15, 180, 195, 180); //line 7
  pdf.line(70, 225, 95, 225); //line 8
  pdf.line(70, 255, 95, 255); //line 9
  pdf.line(50, 285, 90, 285); //line 10

  //xett altdaki yazilar
  pdf.setFontSize(10);
  pdf.text("(pul ödəyənin vəzifəsi, soyadı, adı, atasının adı", 70, 85);
  pdf.text("şəxsiyyəti təsdiq edən sənəd, ünvanı)", 80, 100);
  pdf.text("məqsədi aydın yazmaq", 90, 120);
  pdf.text("rəqəm və yazı ilə tam aydın göstərmək", 75, 155);

  //xett uzerindeki static yazilar
  pdf.setFontSize(12);
  pdf.text("Kimdən", 15, 75);
  pdf.text("Nə üçün", 15, 110);
  pdf.text("Məbləğ", 15, 145);
  pdf.text("Kassaya mədaxil edilmişdir", 15, 195);
  pdf.text("İmza", 15, 225);
  pdf.text("M.Y", 15, 255);
  pdf.text("Müştəri:", 70, 225, { align: "right" });
  pdf.text("S.Təmsili:", 70, 255, { align: "right" });
  pdf.text("Kassa qəbulu:", 15, 285);

  //xett uzerindeki dinamyc yazilar
  pdf.text("ƏLİYEV TEYYUB EYYUB", 50, 78);
  pdf.text("AZE 1234567, BAKI Ş., SABUNÇU R., BALAXANI Q.", 50, 93);
  
  pdf.text("SƏBƏB OLARAQ ONU DEMƏK LAZIMDIRKİ, MƏDAXİL QƏBZİ  VACİB SƏNƏDDİR", 50, 113);
  pdf.text("SƏBƏB OLARAQ ONU DEMƏK LAZIMDIRKİ, MƏDAXİL QƏBZİ  VACİB SƏNƏDDİR", 50, 128);
  pdf.text("5198.55, BEŞ MİN YÜZ DOXSAN SƏKKİZ MANAT 55 QƏPİK", 50, 148);


  pdf.save("Mədaxil qəbzi");
};
