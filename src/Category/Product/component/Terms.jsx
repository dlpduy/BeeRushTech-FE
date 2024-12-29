import React from "react";
import styles from "./Terms.module.css"

const Terms = () => {
    return(
        <main className={styles.mainLayout}>
            <aside className={styles.left}>
    <div>
      <h2>1. Quy trình thuê sản phẩm</h2>
      <ol>
        <li><strong>Tạo tài khoản:</strong> Người thuê cần đăng ký tài khoản trên nền tảng và xác thực thông tin cá nhân (bằng email hoặc số điện thoại).</li>
        <li><strong>Lựa chọn sản phẩm:</strong> Chọn thiết bị muốn thuê, xác định thời gian thuê (giờ, ngày, tuần) và thêm vào giỏ hàng.</li>
        <li><strong>Xác nhận đơn thuê:</strong> Xem lại thông tin đơn thuê, đồng ý với các điều khoản, và tiến hành xác nhận đơn hàng.</li>
        <li><strong>Thanh toán và đặt cọc:</strong> Thanh toán chi phí thuê thiết bị và các phí dịch vụ liên quan. Đặt cọc số tiền bảo đảm (Khi khách hàng thuê sản phẩm, sẽ phải trả tiền thế chân từ 1 triệu đến 3 triệu VNĐ, tùy thuộc vào thiết bị).</li>
      </ol>

      <div>
        <h2>2. Thủ tục mặc định khi thuê sản phẩm</h2>
        <p>Để đảm bảo quyền lợi cho cả hai bên, người thuê cần cung cấp các giấy tờ và thực hiện các thủ tục sau:</p>
        <ul>
          <li><strong>Chứng minh nhân thân:</strong> Cung cấp bản sao hoặc hình ảnh CMND/CCCD, hộ chiếu, hoặc bằng lái xe hợp lệ.</li>
          <li><strong>Hợp đồng thuê:</strong> Ký hợp đồng thuê thiết bị bao gồm các điều khoản sử dụng, quyền lợi và trách nhiệm của người thuê.</li>
          <li><strong>Biên bản bàn giao:</strong> Ghi nhận tình trạng thiết bị trước khi bàn giao, bao gồm hình ảnh hoặc mô tả cụ thể (nếu có).</li>
          <li><strong>Biên lai thanh toán:</strong> Người thuê nhận biên lai xác nhận đã thanh toán các khoản phí.</li>
        </ul>
      </div>


    </div>
            </aside>
            <main className={styles.right}>
            <div>

      <h2> 3.Kiểm tra sản phẩm trước khi nhận</h2>
        <ul>
          <li><strong>Trách nhiệm của người thuê:</strong>
            <ul>
              <li>Kiểm tra toàn bộ thiết bị để phát hiện lỗi hoặc hư hỏng (nếu có).</li>
              <li>Đảm bảo thiết bị đầy đủ phụ kiện đi kèm (như sạc, dây cáp, hộp bảo quản).</li>
              <li>Chụp ảnh tình trạng thiết bị và ký vào biên bản bàn giao để xác nhận tình trạng ban đầu.</li>
            </ul>
          </li>
          <li><strong>Trách nhiệm của bên cho thuê:</strong>
            <ul>
              <li>Bảo đảm thiết bị được kiểm tra và vệ sinh trước khi bàn giao.</li>
              <li>Cung cấp đầy đủ phụ kiện, tài liệu hướng dẫn sử dụng.</li>
            </ul>
          </li>
        </ul>
      <h2>4.Trả sản phẩm</h2>
      <ul>
        <li><strong>Thời gian:</strong>
        Người thuê phải trả sản phẩm đúng thời gian ghi trong hợp đồng. Mọi trường hợp trả trễ sẽ bị áp dụng phí phạt.
        </li>
        <li><strong>Địa điểm:</strong>
        Trả sản phẩm tại điểm trả cố định hoặc sử dụng dịch vụ nhận sản phẩm tận nơi (nếu có).
        </li>
        <li><strong>Kiểm tra thiết bị:</strong> 
          <ul>
            <li>Bên cho thuê kiểm tra thiết bị ngay tại điểm trả để đối chiếu tình trạng với biên bản bàn giao.</li>
            <li>Ghi nhận và xử lý mọi vấn đề liên quan đến hư hỏng hoặc thiếu phụ kiện.</li>
          </ul>
        </li>
        <li><strong>Hoàn trả tài sản đảm bảo:</strong> 
          <ul>
            <li>Tiền đặt cọc hoặc tài sản thế chấp sẽ được hoàn lại sau khi xác nhận thiết bị không bị hư hỏng.</li>
            <li>Trong trường hợp thiết bị hư hỏng hoặc mất mát, khoản tiền này sẽ được trừ vào chi phí bồi thường.</li>
          </ul>
        </li>
      </ul>

      <h2>5.Trách nhiệm của bên cho thuê</h2>
      <ol>
        <li><strong>Đảm bảo chất lượng thiết bị:</strong> 
          <ul>
            <li>Cung cấp sản phẩm hoạt động tốt, không có lỗi kỹ thuật hoặc hư hỏng ban đầu.</li>
            <li>Thay thế hoặc hoàn tiền trong trường hợp thiết bị gặp lỗi không phải do người thuê.</li>
          </ul>
        </li>
        <li><strong>Công khai minh bạch:</strong>
          <ul>
            <li>Thông báo rõ ràng các khoản phí, điều kiện thuê, và chính sách bồi thường.</li>
            <li>Cung cấp hợp đồng, biên bản rõ ràng để đảm bảo quyền lợi cho người thuê.</li>
          </ul>
        </li>
        <li><strong>Hỗ trợ khách hàng:</strong>
          <ul>
            <li>Đội ngũ hỗ trợ sẵn sàng giải quyết các vấn đề kỹ thuật trong suốt thời gian thuê.</li>
            <li>Đảm bảo xử lý khiếu nại và hoàn tiền nhanh chóng theo chính sách.</li>
          </ul>
        </li>
        <li><strong>Bảo mật thông tin:</strong>Cam kết bảo mật dữ liệu cá nhân và tài chính của người thuê.</li>
      </ol>

      
    </div>
            </main>
        </main>
    );
}

export default Terms;