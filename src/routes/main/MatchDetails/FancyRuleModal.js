import React from 'react';
import { Col, Modal, Row } from 'antd';

function FancyRuleModal({closeFancyRuleModal}) {
  
  return (
    <Modal
      open={true}
      title="Session Book"
      onCancel={closeFancyRuleModal}
      footer={null}
      className="gx-px-3"
    >
       <Row>
    <Col>
      <div>
        <strong>Fancy Rules:</strong><br />
        
        <ol>
          <li><strong>मैच के टाई होने पर:</strong> सभी फैंसी बेटस को मान्य किया जाएगा।</li>
          <li><strong>टॉस या मौसम की स्थिति से पहले:</strong> सभी एडवांस फैंसी को कैंसिल कर दिया जाएगा।</li>
          <li><strong>गलत रेट पर:</strong> यदि किसी भी स्थिति में फैंसी में गलत रेट दिया गया है, तो वह बेट रद्द कर दी जाएगी।</li>
          <li><strong>गलत तरीके से बेट लगाना:</strong> यदि ग्राहक गलत तरीके से बेट लगाते हैं तो हम हटाने के लिए उत्तरदायी नहीं हैं, कोई बदलाव नहीं किया जाएगा और बेट्स को पक्का माना जाएगा।</li>
          <li><strong>मैनेजमेंट का निर्णय:</strong> किसी भी परिस्थिति में मैनेजमेंट का निर्णय अंतिम होगा।</li>
          <li><strong>तकनीकी खराबी के कारण:</strong> किसी भी तकनीकी खराबी के कारण मार्किट खुला है और रिजल्ट आ गया है रिजल्ट के बाद सभी बेट्स हटा दिए जाएंगे।</li>
          <li><strong>ओपनिंग बल्लेबाज:</strong> एडवांस में फैंसी ओपनिंग बल्लेबाज केवल तभी मान्य होते हैं जब वही बल्लेबाज ओपनिंग में आए हों तो फैंसी मान्य होगी यदि एक बल्लेबाज को बदल दिया जाता है तो उस खिलाड़ी की फैंसी हटा दी जाएगी।</li>
          <li><strong>नो बॉल के मामले में:</strong> यदि नो बॉल के मामले में, गलत बेट्स हटा दिए जाएंगे, तो अंतिम निर्णय मैनेजमेंट का होगा।</li>
          <li><strong>1stwkt, 2ndwkt और 1st 3rdwkt एडवांस फैंसी:</strong> केवल पहली पारी में मान्य है।</li>
        </ol>

   
        <ol>
          <li><strong>In case of a tied match:</strong> All fancy bets will be validated.</li>
          <li><strong>Before toss or weather conditions:</strong> All advance fancy bets will be suspended.</li>
          <li><strong>Wrong rate:</strong> If a wrong rate is given in fancy, that particular bet will be canceled.</li>
          <li><strong>Incorrect betting by customers:</strong> If customers place bets incorrectly, we are not liable for deletion, no changes will be made, and bets will be considered confirmed.</li>
          <li><strong>Management's decision:</strong> In any circumstances, management's decision will be final.</li>
          <li><strong>Technical errors:</strong> Due to any technical errors, if the market is open and the result has come, all bets after the result will be deleted.</li>
          <li><strong>Opening batsmen:</strong> Advance fancy opening batsmen are valid only if the same batsmen come in the opening. If a batsman is changed, that player's fancy will be deleted.</li>
          <li><strong>In case of NO BALL:</strong> If wrong bets are deleted due to NO BALL, the final decision will be made by management.</li>
          <li><strong>1st 2wkt & 1st 3wkt advance fancy:</strong> Valid only in the First Innings.</li>
        </ol>
        
        <br />
        <strong>Test Rules:</strong><br />
        <strong>Hindi:</strong><br />
        <ol>
          <li><strong>पूर्ण फ़ैन्सी:</strong> केवल पहली पारी में मान्य होगी।</li>
          <li><strong>मिडिल सेशन और पारी घोषित या ऑल आउट:</strong> मिडल सेशन और पारी घोषित या ऑल आउट होने के कारण पूरा नहीं हुआ है ताकि विशेष ओवर को पूरा माना जाए और अगली टीम की पारी में शेष ओवर की गिनती की जाए।</li>
          <li><strong>बल्लेबाज़ चोटिल होने पर:</strong> यदि बल्लेबाज़ चोटिल होता है और वह 34 रन बना लेता है तो रिजल्ट में 34 रन दिए जाएंगे।</li>
          <li><strong>50/100 रन:</strong> बल्लेबाज 50/100 रन अगर बल्लेबाज चोटिल हो जाता है या घोषणा करता है तो रिजल्ट उसके रन पर दिया जाएगा।</li>
          <li><strong>एडवांस फैंसी बल्लेबाजों का रन:</strong> टेस्ट मैच में दोनों एडवांस फैंसी बल्लेबाजों का रन वैध है।</li>
        </ol>
        
        <strong>English:</strong><br />
        <ol>
          <li><strong>Complete fancy:</strong> Valid only in the first innings.</li>
          <li><strong>Middle session and innings declaration or all-out:</strong> If a session is not completed due to innings declared or all-out, the particular over will be considered completed, and remaining overs will be counted in the next team's innings.</li>
          <li><strong>Injured batsman:</strong> If a batsman is injured and makes 34 runs, the result will be given as 34 runs.</li>
          <li><strong>50/100 runs:</strong> If a batsman is injured or the innings is declared at 50/100 runs, the result will be given on the particular run scored.</li>
          <li><strong>Advance fancy batsmen's runs:</strong> Valid in test matches for both advance fancy batsmen.</li>
        </ol>
        
      </div>
    </Col>
  </Row>
    </Modal>
  );
}

export default FancyRuleModal;

