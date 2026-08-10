import React from "react";
import LegalPage from "./LegalPage";

const TermsOfUsePage: React.FC = () => {
  return (
    <LegalPage
      eyebrow="ПОЛИТИКА ИСПОЛЬЗОВАНИЯ"
      title={
        <>
          Политика <span className="text-orange">использования Vitech</span>
        </>
      }
      updated="Последнее обновление: 14 декабря 2024 года"
    >
      <p className="font-inter text-[14px] leading-[22px] tracking-[-0.02em] align-middle">
        Настоящая Политика использования регулирует условия пользования нашим сайтом. Используя сайт, вы соглашаетесь с изложенными ниже правилами и обязуетесь соблюдать их.
      </p>

      <section>
        <h2 className="mb-3 font-inter font-medium text-[16px] leading-[20px] tracking-[-0.02em] align-middle">1. Общие положения</h2>
        <p className="font-inter text-[14px] leading-[22px] tracking-[-0.02em] align-middle">
          При использовании сайта вы обязуетесь соблюдать действующее законодательство, уважать права других пользователей и не предпринимать действий, которые могут нанести ущерб сайту или его пользователям.
        </p>
      </section>

      <section>
        <h2 className="mb-3 font-inter font-medium text-[16px] leading-[20px] tracking-[-0.02em] align-middle">2. Доступ к услугам</h2>
        <p className="font-inter text-[14px] leading-[22px] tracking-[-0.02em] align-middle">
          Наш сайт предоставляет доступ к различным сервисам, включая просмотр контента, регистрацию, оформление заказов и другие функции. Мы оставляем за собой право изменять, приостанавливать или прекращать предоставление любых услуг без предварительного уведомления.
        </p>
      </section>

      <section>
        <h2 className="mb-3 font-inter font-medium text-[16px] leading-[20px] tracking-[-0.02em] align-middle">3. Ответственность пользователей</h2>
        <p className="font-inter text-[14px] leading-[22px] tracking-[-0.02em] align-middle">
          Вы несете ответственность за информацию, размещенную на сайте, а также за последствия своих действий. Запрещается публиковать незаконный, оскорбительный, вредоносный или вводящий в заблуждение контент.
        </p>
      </section>

      <section>
        <h2 className="mb-3 font-inter font-medium text-[16px] leading-[20px] tracking-[-0.02em] align-middle">4. Ограничения и запреты</h2>
        <p className="font-inter text-[14px] leading-[22px] tracking-[-0.02em] align-middle">
          Запрещено использовать сайт для незаконных целей, распространять вредоносное программное обеспечение, нарушать права третьих лиц или препятствовать нормальной работе сайта. В случае нарушения этих правил мы имеем право заблокировать ваш доступ без предупреждения.
        </p>
      </section>

      <section>
        <h2 className="mb-3 font-inter font-medium text-[16px] leading-[20px] tracking-[-0.02em] align-middle">5. Интеллектуальная собственность</h2>
        <p className="font-inter text-[14px] leading-[22px] tracking-[-0.02em] align-middle">
          Все материалы, размещенные на сайте, включая тексты, изображения, логотипы и программный код, защищены авторским правом и принадлежат владельцам сайта или третьим лицам, предоставившим разрешение на их использование. Несанкционированное копирование или распространение материалов запрещено.
        </p>
      </section>

      <section>
        <h2 className="mb-3 font-inter font-medium text-[16px] leading-[20px] tracking-[-0.02em] align-middle">6. Ограничение ответственности</h2>
        <p className="font-inter text-[14px] leading-[22px] tracking-[-0.02em] align-middle">
          Мы не несем ответственности за возможные ошибки, перебои в работе сайта, потерю данных или другой ущерб, возникший в результате его использования. Все услуги предоставляются «как есть», без гарантии их бесперебойной работы.
        </p>
      </section>

      <section>
        <h2 className="mb-3 font-inter font-medium text-[16px] leading-[20px] tracking-[-0.02em] align-middle">7. Изменения в Политике использования</h2>
        <p className="font-inter text-[14px] leading-[22px] tracking-[-0.02em] align-middle">
          Мы оставляем за собой право изменять данную Политику использования в любое время. Все изменения вступают в силу с момента их публикации на сайте. Мы рекомендуем регулярно проверять актуальность данного документа.
        </p>
      </section>

      <section>
        <h2 className="mb-3 font-inter font-medium text-[16px] leading-[20px] tracking-[-0.02em] align-middle">8. Контакты</h2>
        <p className="mb-3 font-inter text-[14px] leading-[22px] tracking-[-0.02em] align-middle">Если у вас есть вопросы по данной Политике использования, вы можете связаться с нами следующими способами:</p>
        <ul className="list-disc pl-5 font-inter text-[14px] leading-[22px] tracking-[-0.02em] align-middle">
          <li>По телефону: +998 71 200-66-88</li>
          <li>По почте: info@vitech.uz</li>
          <li>По адресу: Республика Узбекистан, г.Ташкент, ул. Юкори Чирчик, 1 А</li>
        </ul>
      </section>
    </LegalPage>
  );
};

export default TermsOfUsePage;
